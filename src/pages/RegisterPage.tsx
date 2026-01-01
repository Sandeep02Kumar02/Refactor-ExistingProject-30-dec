/**
 * Register Page component
 * New user registration page
 */

import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-burger-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
