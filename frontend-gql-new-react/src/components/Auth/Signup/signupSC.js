import styled from 'styled-components';

const loginWrapper = styled.div`

    @import url('https://fonts.googleapis.com/css?family=Raleway');

    display: flex;
    /* background: rgb(91, 91, 209); */
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;
    /* background: rgb(91, 91, 209);  */
    /* .main-wrapper {
        display: flex;
        height: 100vh;
        width: 100%;
        justify-content: center; }
        align-items: center; */
    .signiture {
        position: absolute;
        bottom: 0;
        left: 10px;
        color: rgb(177, 177, 241);
    }

    .box {
        display: flex;
        padding: 0px 40px;
        padding-top: 20px;
        border-radius: 20px;
        width: 40%;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        background: linear-gradient(to bottom right, rgb(255, 255, 255), rgb(195, 195, 195));
        box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.63);
    }

    .box-header {
        display: flex;
        font-size: 30px;
        margin-bottom: 40px;
    }

    .box-header > h1 {
        margin: 0;
        font-weight: 500;
    }

    .box-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .box-form input {
        border-style: solid;
        border-width: 1px;
        border-radius: 5px;
        text-align: center;
        font-size: 20px;
        border-color: rgb(202, 202, 202);
        width: 100%;
        padding: 10px 0px;
        margin-bottom: 10px;
    }


    .box-form input:last-child {
        width: 100%;
        padding: 20px 0px;
    }

    .box-form button {
        padding: 20px 0px;
        width: 40%;
        margin: 0;
        margin-top: 20px;
        font-size: 20px;
        font-weight: 500;
        cursor: pointer;
    }

    .link {
        text-align: center;
        text-decoration: none;
        font-size: 20px;
        margin-top: 30px;
        margin-bottom: 5px;
        width:100%;
    }

    .link-signup {
        font-weight: 500;
        color: rgb(91, 91, 209);
    }
    

`

export default loginWrapper;

