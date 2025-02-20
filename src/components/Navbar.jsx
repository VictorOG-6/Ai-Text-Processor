const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-screen flex items-center h-14 p-1.5 bg-gradient-to-tr from-[#29dade] via-[#81f6ab] to-[#baf58e]">
      <img className="size-10 object-cover" src="/logo.png" alt="logo-alt" />
      <p className="ml-2 text-black text-2xl font-bold">
        Ploe AI - AI Text Processor
      </p>
    </div>
  );
};

export default Navbar;
