import axios from 'axios'

export default {

  async submit (type, formData) {
    if(type == '1'){
      const fields = [  "village",
        "building",
        "unit",
        "door",
        "user_mobile"
      ];
      fields.forEach(f=>{
        delete formData[f];
      });
    }
    const res = await axios.post(`/race/api/submit?type=${type}`, formData);
    return res.data;
  },
}