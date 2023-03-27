function RegistrationPage() {
    return (
        <div className="flex justify-center">
            <div className="flex bg-white rounded-[30px] p-5">
                <div className="flex flex-col bg-green-custom1 rounded-[20px] p-6">
                    <h2>Welcome to Tastyplan</h2>
                    <p>Already have an Account?</p>
                </div>
                <form className="w-[36rem] bg-white px-4">
                    <fieldset className="pl-12 pr-4">
                        <legend className="h2-black">Register</legend>
                        <p className="text-xs mb-10">
                            Already have an account? Log in <a href="/">here!</a>
                        </p>
                        <div className="flex flex-col">
                            <div className="text-input-wrapper mb-6">
                                <label htmlFor="email">E-Mail Adress</label>
                                <input type="text" name="email" />
                            </div>
                            <div className="text-input-wrapper mb-6">
                                <label htmlFor="nickname">Nickname</label>
                                <input type="text" name="nickname" />
                            </div>
                            <div className="text-input-wrapper mb-6">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" />
                            </div>
                            <div className="text-input-wrapper mb-8">
                                <label htmlFor="passwordConfirmation">Confirm Password</label>
                                <input type="password" name="passwordConfirmation" />
                            </div>
                            <button className="btn-submit ml-auto mr-0" type="submit">
                                Create Account
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default RegistrationPage;
