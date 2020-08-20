import React from "react";

const Bookshelf = () => {
	return(
		<section id="bookshelf">

	      <div className="row work">

	         <div className="three columns header-col">
	            <h1><span>Bookshelf</span></h1>
	         </div>

	         <div className="nine columns main-col">
	          <div key="books"><h3>For a long time I've been in love with the idea of having a virtual shelf with books that influenced me over the years. Here are some of them:</h3>
		          <ul className="shelf pl4 mt4" style={{listStyleType: "circle"}}>
		          	<li><p className="info mb0">Superintelligence<span>&bull;</span> <em className="author">Nick Bostrom</em></p></li>
		          	<li><p className="info mb0">12 Rules for Life<span>&bull;</span> <em className="author">Jordan Peterson</em></p></li>
		          	<li><p className="info mb0">Zero to One<span>&bull;</span> <em className="author">Blake Masters and Peter Thiel</em></p></li>
		          	<li><p className="info mb0">Security Analysis<span>&bull;</span> <em className="author">Benjamin Graham and David Dodd</em></p></li>
		          	<li><p className="info mb0">Deep Work<span>&bull;</span> <em className="author">Cal Newport</em></p></li>
		          	<li><p className="info mb0">Fooled by Randomness<span>&bull;</span> <em className="author">Nassim Nicholas Taleb</em></p></li>
		          	<li><p className="info mb0">Finance and the Good Society<span>&bull;</span> <em className="author">Robert J. Shiller</em></p></li>
		          	<li><p className="info mb0">The Black Swan<span>&bull;</span> <em className="author">Nassim Nicholas Taleb</em></p></li>
		          	<li><p className="info mb0">Principles<span>&bull;</span> <em className="author">Ray Dalio</em></p></li>
		          	<li><p className="info mb0">Introduction to Statistical Learning<span>&bull;</span> <em className="author">Gareth M. James</em></p></li>
			      </ul>
		      </div>
	        </div>
	    </div>

   </section>
	);
}

export default Bookshelf;