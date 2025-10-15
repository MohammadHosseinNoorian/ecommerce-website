import { memo, useEffect } from "react";
import style from "./Blog.module.css";

const Blog = () => {
  useEffect(() => {});
  return (
    <div className={style.blog}>
      <h1>
        Welcome to BookWorld.com: Your Ultimate Destination for Book Lovers
      </h1>
      <p>
        {" "}
        Are you an avid reader looking for a haven where you can explore the
        wonderful world of books? Look no further! At BookWorld.com, we're
        dedicated to bringing you the best in literature, from timeless classics
        to contemporary masterpieces.
      </p>
      <h1>Discover New Books and Authors</h1>
      <p>
        Our carefully curated selections feature everything from best-selling
        authors to hidden gems waiting to be discovered. Whether you're into
        fiction, non-fiction, fantasy, mystery, romance, or any other genre,
        BookWorld.comhas something for everyone.
      </p>
      <h1>Top Book Recommendations</h1>
      <p>
        Stay updated with our top book recommendations and reviews. Our team of
        passionate readers shares their insights and opinions, helping you find
        your next favorite read. Plus, our "Top Books" section highlights the
        must-reads of the year, making it easy to stay ahead in your literary
        journey.
      </p>
      <h1> Engage with the Community</h1>
      <p>
        {" "}
        BookWorld.comisn't just a website; it's a thriving community of book
        enthusiasts. Join our forums to discuss your favorite books, share your
        thoughts, and connect with like-minded readers. Our community is here to
        support and inspire your reading adventures.
      </p>
      <h1>Exclusive Content and Events</h1>
      <p>
        Get access to exclusive content, author interviews, book signings, and
        virtual events that bring you closer to the literary world. Our blog and
        newsletter keep you informed about all the latest happenings in the book
        world.
      </p>
      <h1>Easy and Convenient Shopping</h1>
      <p>
        With our user-friendly online store, finding and purchasing books has
        never been easier. Browse our extensive collection, read reviews, and
        make secure purchases with just a few clicks. Plus, our dedicated
        customer service team is always here to assist you. Join Us at
        BookWorld.com We invite you to explore BookWorld.comand discover why
        we're the go-to destination for book lovers everywhere. Happy reading!
      </p>
    </div>
  );
};

export default memo(Blog);
