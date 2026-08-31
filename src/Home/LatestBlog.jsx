import React from "react";
import { FiCalendar, FiMessageSquare } from "react-icons/fi";



const BLOGS = [
    {
        image: "/assets/images/imgg-1.png",
        topDate: "May 09, 2023",
        category: "Real Estate",
        title: "How To Choose The Right Real Estate Agent For You",
        date: "April 12, 2023",
        comments: "15",
    },
    {
        image: "/assets/images/imgg-2.png",
        topDate: "May 09, 2023",
        category: "Real Estate",
        title: "The Benefits Of Investing In Real Estate For Passive Income",
        date: "April 12, 2023",
        comments: "15",
    },
    {
        image: "/assets/images/imgg-3.png",
        topDate: "May 19, 2023",
        category: "Real Estate",
        title: "Top 10 Things To Consider When Selling Your Home",
        date: "April 12, 2023",
        comments: "15",
    },
];
const LatestBlog = () => {
    return (
        <section className="latest-blog">
            <div className="blog-container">

                {/* Heading */}
                <div className="blog-heading">
                    <h2>STAY INFORMED WITH OUR LATEST BLOG</h2>

                    <p>
                        Stay up-to-date with the latest news and trends in the real estate
                        <br className="desktop-break" />
                        market with our informative blog articles.
                    </p>
                </div>

                {/* Blog Cards */}
                <div className="blog-grid">

                    {BLOGS.map((blog, index) => (
                        <article className="blog-card" key={index}>

                            {/* Image */}
                            <div className="blog-image">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                />

                                <span className="blog-top-date">
                                    {blog.topDate}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="blog-content">

                                <span className="blog-category">
                                    {blog.category}
                                </span>

                                <h3>
                                    {blog.title}
                                </h3>

                                {/* Bottom Info */}
                                <div className="blog-meta">

                                    <div className="meta-item">
                                        <FiCalendar />
                                        <span>{blog.date}</span>
                                    </div>

                                    <div className="meta-item">
                                        <FiMessageSquare />
                                        <span>{blog.comments}</span>
                                    </div>

                                </div>
                            </div>

                        </article>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default LatestBlog;