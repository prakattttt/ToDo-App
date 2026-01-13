const AuthLayout = ({ title, subtitle, children, footer }) => {
  return (
    <div className="max-h-screen flex items-center justify-center px-4 mt-15">
      <div
        className="bg-white w-full max-w-md rounded-xl shadow-2xl p-8 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]" >
        <h2 className="text-2xl font-semibold text-center mb-2">{title}</h2>

        <p className="text-gray-500 text-center mb-6">{subtitle}</p>

        {children}

        {footer && (
          <div className="text-center mt-6 text-sm text-gray-500">{footer}</div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
