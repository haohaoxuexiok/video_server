const {getUserSuggest} = require("../../service/uniapp/management_ser");

const getSuggest = async (ctx, next) => {
    const result =await getUserSuggest()
    ctx.body = result
};

module.exports = {
    getSuggest
};
  