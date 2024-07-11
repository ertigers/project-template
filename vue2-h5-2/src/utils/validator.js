var qx_validator = {
  isMobile: (phoneNumber) => {
    const pattern = /^1[3-9]\d{9}$/;
    return pattern.test(phoneNumber);
  },
};

export default qx_validator;
