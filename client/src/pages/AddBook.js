import React, { useState, useEffect } from "react";
import API from "../utils/API.js";
import Jumbotron from "../components/jumbotron.js";
import Card from "../components/card.js";
import Navbar from "../components/navbar.js";
import Search from "../components/searchForm.js";
import Button from "../components/formButton.js";





const AddBook = () => {
    
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([]);
    const [inputFields, setInputFields] = useState({
        title: "",
        author: "",
        description: "",
        image: "",
        link: ""
        
    });

    let i;

    useEffect(() => {
        
        console.log(results)
    }, [results]);


    const setChange = (event) => setSearch(event.target.value)


    const handleFormSubmit = (event) => {
        event.preventDefault();
        API.search(search)
        .then(res => (
            
            setResults(res.data.items))
        )
        .catch(error => console.log(error));

    }


   const addMongo = async(i) => {

    console.log("Clicked");
    console.log(i);
    await API.saveBook({
        ...inputFields,
    });
    setInputFields({
        title: results[i].volumeInfo.title,
        author: results[i].volumeInfo.authors,
        description: results[i].volumeInfo.description,
        image: results[i].volumeInfo.infoLink,
        link: results[i].volumeInfo.imageLinks === undefined ? "" : results[i].volumeInfo.imageLinks.thumbnail

        
    });

                            





   }




    return (
        <div>
            <Jumbotron
                header = {"Add A Book!"}
                sentence = {"Enter By Title or Author"}  
            />
            <Search
                setChange = {setChange}
                submit = {handleFormSubmit}
            />

            <ul>
                
                {results.map((result, i) => (
                    <li key = {i}>
                        <Button
                            value = {i}
                            click = {() => addMongo(i)}
                        />
                        <Card
                            
                            key = {i}
                            bookTitle = {result.volumeInfo.title}
                            subTitle = {result.volumeInfo.authors}
                            synopsis = {result.volumeInfo.description}
                            view = {result.volumeInfo.infoLink}
                            image = {result.volumeInfo.imageLinks === undefined
                                ? ""
                                : `${result.volumeInfo.imageLinks.thumbnail}`
                            }
                        />
                        
                    </li>
                ))}
            </ul>
            



        </div>
    );
}

export default AddBook;