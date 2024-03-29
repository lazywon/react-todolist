const loginApi = async (axios, userid, password, setAuth) => {
  try {
    setAuth({ userid: '', token: '' });

    const response = await axios.get('/login', {
      userid: userid,
      password: password,
    });
    console.log(response.data.data);

    if (
      response.data.data === 'success' &&
      response.data.userid === 'grace09'
    ) {
      setAuth({ userid: userid, token: response.data });
    } else {
      setAuth({ userid: '', token: '' });
    }
  } catch (error) {
    console.log(error);
    alert('로그인에 실패하셨습니다. ');
  }
};

export default loginApi;
