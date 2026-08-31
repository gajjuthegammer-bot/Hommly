import Banner_props from "../Blogs/Banner_props";
import Footer from "../Footer";
import Header from "../Header";
import Filter_sidebar from "./Filter_sidebar";
import PropertyListing from "./Propertylisting";


const Properties = () => {
    return(
        <>
        <Header/>
        <Banner_props heading="Properties" />
        <PropertyListing />
        {/* <Filter_sidebar /> */}
        <Footer/>
        </>
    )
}
export default Properties;