
import Banner_props from "../Blogs/Banner_props";
import Footer from "../Footer";
import Header from "../Header";
import Testimonial from "../Home/Testimonial";

const About_us = () => {
    return(
        <>
        <Header/>
        <Banner_props heading={"About Us"} />
        <Testimonial/>
        <Footer/>
        </>
    )
}
export default About_us;