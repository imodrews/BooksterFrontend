import React, {useState} from "react";
import { Link } from "react-router-dom";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import { TextField, Typography, Button, Grid, Box} from "@material-ui/core";


import BookCard from "./BookCard"


import { NavLink } from "react-router-dom";

import axios from "axios";
// import BookShelf from "./BookShelf";


const InputField = withStyles({
    root:{
        "& label.Mui-focused":{
            color: "#DB5CA2"
        },
        "& label":{
            color: "5CDB95",
            fontFamily: "'Oswald', sans-serif"
        },
        "&:hover fieldSet":{
            borderColor: "5CDB95"
        },
        "&.Mui-focused fieldSet":{
            borderColor: "5CDB95"
        }
    }
})(TextField);


const useStyles = makeStyles(theme=>({
    form:{
        top:"50%",
        left:"50%",
        transform: "translate(-50%, -50%)",
        position: "absolute"
    },
    button: {
        marginTop: "1rem",
        color: "#C38D9E",
        borderColor: "white",
        borderRadius: "18px",
        fontFamily:"'Oswald', sans-serif",
        width: '150px',
        
    },
    header: {
        textAlign: "center",
        textTransform:"uppercase",
        marginBottom:"30px",
        fontFamily:"font1",
        color:"#fcd392"
    },
    text:{
        fontFamily: "'Oswald', sans-serif",
        textAlign: "center",
        // color:"#fcd392"
    },
    link:{
        textDecoration: "none"
    },
    flex: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '10px',
        alignContent: 'space-around',
        justifyContent:'space-around'
    },
    divs: {
        border: '1px solid black',
        padding: '5px',
        margin: '5px'

    },
    buttonflex:{
        display: 'flex',
        flexDirection: 'column',
       
        alignContent:'center'
    }
}))









const Search = ({props}) =>{

const classes = useStyles();
// const history = useHistory();

const [query, setQuery] = useState('');
const [results, setResults] =useState([])
// const [book, setBook] =useState([]);

const handleSearch = (e) =>{
    setQuery(e.target.value)
    // console.log(query)
}

const handleSubmit = (e) =>{
    e.preventDefault();
 
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=18&startIndex=1&key=AIzaSyDXXOp7xMvzIDXxTNqgD3oqjh8o5ZlHXMw`)
    
    .then(data =>{
        setResults(data.data.items)
        /* console.log(data.data.items) */
    })
    .catch(err=>{
        console.log(err.res)
    }) 
}



    return(
        <>
        <Box>
            <Box component="div" style={{background:"#718680", height:"100vh"}}>
                <Grid container justify="center">
                    <Box component="form"  onSubmit={handleSubmit} className={classes.form}>
                        <Typography variant="h3" className={classes.header}>
                            What Book Are You Looking For?
                        </Typography>
                        <Typography variant="h6" className={classes.text}>
                            You can search for a book based on title or author
                        </Typography>
                        <InputField 
                            label="search for a book"
                            fullWidth={true}
                            margin="dense"
                            size="medium"
                            name="book"
                            value={query}
                            onChange={handleSearch}
                            type="text"
                            autoComplete="off"
                        />
                        <br />
                      
                            <Button type="submit" onSubmit={handleSubmit}  variant="contained"  className={classes.button} >
                                Search
                            </Button>
                            <NavLink to="/bookshelf" className={classes.link}>
                                <Button  variant="contained"  className={classes.button} >
                                Go To My Bookshelf
                            </Button>
                            </NavLink>
                 
                    </Box> 
                   
                </Grid>

        
           </Box>

           <Box className={classes.flex}>
           {results && results.map((book) => {return (
           
            <BookCard book={book} />
          
           )})}
           </Box>
    </Box>
    </>
  )
}




export default Search;