import mongoose from "mongoose";

const validPairs = function (pairs) {
  const seenChars = new Set();

  return pairs.every(pair => {
    if (pair.length !== 2 || !/^[A-Za-z]{2}$/.test(pair)) {
      return false;
    }

    if (seenChars.has(pair[0]) || seenChars.has(pair[1])) {
      return false;
    }

    seenChars.add(pair[0]);
    seenChars.add(pair[1]);
    return true;
  });
};

const settingsSchema = new mongoose.Schema({
  rotors: {
    type: [Number],
    validate: {
      validator: function (rotors) {
        rotors.every(rotor => [1, 2, 3, 4, 5].includes(rotor));
      },
      message: "Rotors can only be of type 1, 2, 3, 4, or 5!",
    },
  },

  reflector: {
    type: String,
    enum: {
      values: ["B", "C"],
      message: "Reflector can only be of type B or C!",
    },
  },

  plugboard: {
    type: [String],
    validate: {
      validator: function (pairs) {
        return validPairs(pairs);
      },
      message:
        "Those were not valid plugboard settings. Make sure there are no duplicate letters, single letters, or non-letters!",
    },
  },

  ringPositions: {
    type: [Number],
    validate: {
      validator: function (positions) {
        positions.every(position => position <= 26);
      },
      message: "All ring positions must be less than or equal to 26!",
    },
  },

  startRotations: {
    type: [Number],
    validate: {
      validator: function (rotations) {
        rotations.every(rotation => rotation <= 26);
      },
      message: "All start rotations must be less than or equal to 26!",
    },
  },

  users: {
    type: [mongoose.Schema.ObjectId],
  },
});

settingsSchema.statics.saveOrUpdateDocument = async function (settings, user) {
  const foundSettings = await this.findOne(settings);

  if (!foundSettings) return this.create(settings, user);

  const { users } = foundSettings;
  if (!users.includes(user)) {
    foundSettings.users.push(user);
    await foundSettings.save();
  }

  return foundSettings;
};

settingsSchema.statics.deleteOrUpdateDocument = async function (
  settingId,
  userId,
) {
  const foundSettings = await this.findOne({
    _id: settingId,
    users: { $in: [userId] },
  });

  const { users } = foundSettings;

  if (!users.length === 1) return this.findByIdAndDelete(settingId);

  const updatedDocument = await this.findByIdAndUpdate(
    settingId,
    { $pull: { users: userId } },
    { new: true },
  );

  return updatedDocument;
};

settingsSchema.statics.deleteOrUpdateDocuments = async function (userId) {
  const updatedDocuments = await this.updateMany(
    { users: userId },
    { $pull: { users: userId } },
  );

  return updatedDocuments;
};

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
