const generateTestString = letter => new Array(250).fill(letter).join("");

export const generateComparisonString = string =>
  string.replaceAll(" ", "").toUpperCase();

export const generateOutput = string =>
  string
    .split("")
    .map(letter => enigma.encrypt(letter))
    .join("");

export const checkOutput = (candidateStr, officialStr) =>
  candidateStr.split("").every((letter, i) => letter === officialStr[i]);

export const testString = generateTestString("A");

export const cryptiiNoPlugboard = generateComparisonString(
  "ftzmg isxip jwgdn jjcoq tyrig dmxfi esrwz gtoiu iekkd cshtp yoepv xnhvr wwesf ruxdg wozdm nkizw nczdu coblt uyhdz govbu ypkoj wbows eemtz fwygk odtbz dqrcz cifdi dxcqz ookvi iomll egmso jxhnf hbofd zctzq powvo mqnwq quozu fmsdx mjxiy zkozd ewged jxsmy hkjkr iqxwb itwly usthz qmgtx xwihd obtkc gzuve"
);

export const cryptiiPlugboard = generateComparisonString(
  "ftzvg ijxip swgdn sscoq tyrig dvxfi ejrwz gtoiu iekkd cjhtp yoepm xnhmr wwejf ruxdg wozdv nkizw nczdu coblt uyhdz gombu ypkos wbowj eevtz fwygk odtbz dqrcz cifdi dxcqz ookmi iovll egvjo sxhnf hbofd zctzq powmo vqnwq quozu fvjdx vsxiy zkozd ewged sxjvy hkskr iqxwb itwly ujthz qvgtx xwihd obtkc gzume"
);

export const cryptiiPlugboardAndRing = generateComparisonString(
  "ewtyx qmcwv boymu fzhct tjums ppzov wljet tfjgu gknib wtstr zdlvd swrom xhssu bzwei vcsum dmjji clrnl oehfs gjzgh mnyec qezik erfpo zjmwh ccckn ewzhk ubqzg jreko nspee nwkls lejqf ngpye xwmxq mgbhh qbnyn mfusf vzrpk louhc tuhcv ulkks gtvpk lyxse umewi frctg kpodl mowmh qvrcp voefz wkhlg bphfn ikknx"
);

export const cryptiiPlugboardAndRingAndRotation = generateComparisonString(
  "bdzgo wcxlt kjbtv cdlpb tuqof xyhcx tgysf linhn xjhiu ngheo rxpqp komhc bubtz jzjoo jterp qewqq pgbdk obibe pjmid olgbg ibvgf sbwzf ckpfv gbxqc imibo rncoc sumyd kvmsp fvdrv tglwf lzlxg seyyq pmpbw nckmk lztcb dddct jnrco omptg bmbbi jgsjo yhgen ctnuu kcugh remwb dsctq xxozl ebzvd brzoj xdtzj zbgdc"
);

