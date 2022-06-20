export default {
    methods: {
        city() {
            return new Promise(res => {
                var myCity = new BMapGL.LocalCity();
                myCity.get(result => {
                    this.cityName = result.name.replace(/\市/g, '');
                    res(this.cityName)
                });
            })
        }
    }
}