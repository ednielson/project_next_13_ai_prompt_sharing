import Feed from "@components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
    Turn QR Codes into Art
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> with our AI QR generator</span>
    </h1>
    <p className='desc text-center pb-6'>
    Traditionally, QR codes have been used purely functional.
     We challenge that. With our advanced AI generator, every QR code transforms into a work of art while retaining its functional purpose.
    </p>
    <button className="cta_btn">Create QR code</button>
    <Feed />
  </section>
);

export default Home;
