import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle } from "@fortawesome/free-brands-svg-icons";

const Login = ({ signIn }) => {
  return (
    <div className="grid grid-cols-2">
      <div className="bg-twitter-bg bg-cover bg-center h-screen grid place-items-center">
        <FontAwesomeIcon icon={faTwitter} className="text-[300px] text-white" />
      </div>
      <div className="flex items-center">
        <div className="px-8">
          <FontAwesomeIcon icon={faTwitter} className="text-twit text-5xl" />
          <h1 className="text-[64px] font-bold py-12">Happening now</h1>
          <h3 className="text-[31px] font-bold pb-8">Join Twitter Today.</h3>
          <div
            className="flex items-center justify-center text-[15px] font-semibold w-[200px] border-[1px] border-gray-300 rounded-full h-[40px] bg-white hover:brightness-90 cursor-pointer"
            onClick={signIn}
          >
            <FontAwesomeIcon icon={faGoogle} className="mr-1" />
            Sign in with Gmail
          </div>

          <p className="text-[13px] max-w-sm mt-4">
            By signing up, you agree to the{" "}
            <span className="text-twit">Terms of Service</span> and{" "}
            <span className="text-twit">Privacy Policy</span>, including{" "}
            <span className="text-twit">Cookie Use</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
