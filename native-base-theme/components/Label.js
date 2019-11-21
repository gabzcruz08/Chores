import variable from './../variables/platform';

export default (variables = variable) => {
  const labelTheme = {
    '.focused': {
      width: 0,
    },
    fontSize: variables.inputFontSize,
  };

  return labelTheme;
};
