module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/utils/common.scss";`
            },
            less: {
                modifyVars: {
                    hack: `true; @import "~@/utils/theme.less";`
                },
            },
        },
    },
}