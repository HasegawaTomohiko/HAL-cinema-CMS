import AddMovieButton from "@/components/movie/movieAddButton";
import MovieForm from "@/components/movie/movieAddForm";
import MovieTables from "@/components/movie/movieTables";
import SampleSideMenu from "@/components/sideMenu";
import React from 'react';

export default function movie() {
	
	const [open, setOpen] = React.useState(false);

	const btnClick = () => {
	  setOpen(true);
	}
  
	const formClose = () => {
	  setOpen(false);
	}
    return (
		<>
			<SampleSideMenu menutitle="映画情報"/>
			<AddMovieButton onClick={btnClick}/>
			<MovieForm open={open} onClose={formClose}/>
			<MovieTables />
		</>
    )
}