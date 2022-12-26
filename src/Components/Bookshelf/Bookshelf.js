import React from "react";
import './Bookshelf.css';

const Bookshelf = () => {
	return(
		<section id="bookshelf">

	      <div className="row_bookshelf">

			<div className="bookshelf_title">
				<h2>BOOKSHELF</h2>
			</div>
			<div className="bookshelf_intro">
				<p>Some books that have influenced me over the years:</p>
			</div>
	         <div className= "books">
		          <ul style={{listStyleType: "circle"}}>
				  	<li><p className="info mb0">Antifragile<span>&bull;</span> <em className="author">Nassim Taleb</em></p></li>
					<li><p className="info mb0">Letters from a Stoic<span>&bull;</span> <em className="author">Seneca</em></p></li>
		          	<li><p className="info mb0">Superintelligence<span>&bull;</span> <em className="author">Nick Bostrom</em></p></li>
		          	<li><p className="info mb0">Security Analysis<span>&bull;</span> <em className="author">Benjamin Graham and David Dodd</em></p></li>
		          	<li><p className="info mb0">Deep Work<span>&bull;</span> <em className="author">Cal Newport</em></p></li>
		          	<li><p className="info mb0">Finance and the Good Society<span>&bull;</span> <em className="author">Robert J. Shiller</em></p></li>
		          	<li><p className="info mb0">The Black Swan<span>&bull;</span> <em className="author">Nassim Taleb</em></p></li>
			      </ul>
	        </div>
	    </div>

   </section>
	);
}

export default Bookshelf;