function LoginPage() {
    return (
        <div className="flex flex-col justify-between w-[1180px] min-h-[700px] bg-white rounded-[20px] py-6 px-12 my-0 mx-auto">
            <h2 className="bg-yellow-300 rounded-[20px] w-fit px-4 shadow-custom">Login</h2>
            <form className="w-3/6 h-full my-0 mx-auto">
                <div className="text-input-wrapper mb-6">
                    <label htmlFor="accountName">E-Mail Adress or User Name</label>
                    <input type="text" name="accountName" />
                </div>
                <div className="text-input-wrapper mb-12">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
                </div>
                <button className="block btn-submit my-0 mx-auto" type="submit">
                    Login
                </button>
            </form>
            <p className="text-xs my-0 mx-auto">
                Don’t have an account yet? Create one <a href="/">here!</a>
            </p>
        </div>
    );
}

export default LoginPage;
