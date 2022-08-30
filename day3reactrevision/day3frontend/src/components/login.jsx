
export const Login=()=>{

    const handlelogin=()=>{}
    return (
        <div>
            <label>Email</label>
            <br/>
            <input type="text" placeholder="Email"/>
            <br/>
            <br/>
            <label>Password</label>
            <br/>
            <input type="password" placeholder="Password"/>
            <br/>
            <br/>
            <button onClick={handlelogin}>login</button>

        </div>
        )
}