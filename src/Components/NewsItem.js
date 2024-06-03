import React, { useState } from 'react'
import NewsCard from './NewsCard';
import swal from 'sweetalert';

function NewsItem() {

    const countryOptions = ["in", "us", "gb", "ca", "au"];
    const categoryOptions = ["business", "entertainment", "general", "health", "science", "sports", "technology"];

    const [country, setCountry] = useState("");
    const [category, setCategory] = useState("");
    const [newsData, setNewsData] = useState([]);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState(true);

    const sortNewsData = () => {
        const sortedData = [...newsData].sort((a, b) => {
            const sourceA = a.source.name.toUpperCase();
            const sourceB = b.source.name.toUpperCase();
            if (sourceA < sourceB) {
                return sortOrder ? -1 : 1;
            }
            if (sourceA > sourceB) {
                return sortOrder ? 1 : -1;
            }
            return 0;
        });
        setSortOrder(!sortOrder);
        setNewsData(sortedData);
    };

    const selectCountry = (country) => {
        setCountry(country.target.value);
    }

    const selectCategory = (category) => {
        setCategory(category.target.value);
    }

    const handleSearch = async () => {
        if (country === "" || category === "") {
            swal("Please select both country and category!", {
                className: "bg-white",
            });
            return;
        }

        let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=66bd6be758cb406eab30a52aca74a70b`
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setNewsData(data.articles);
    }

    const clearSearch = () => {
        setCountry("");
        setCategory("");
        setNewsData([]);
    }

    const ClearGridSearch = async (e) => {
        e.preventDefault();
        setSearch("");

        let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=66bd6be758cb406eab30a52aca74a70b`
        const response = await fetch(url);
        const data = await response.json();

        setNewsData(data.articles);
    }

    const searchNews = async () => {
        debugger;
        if (search === "") {
            swal("Please enter something to search!", {
                className: "bg-white",
            });
            return;
        }

        let url = `https://newsapi.org/v2/everything?q=${search}&apiKey=66bd6be758cb406eab30a52aca74a70b`
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.articles);

        const filteredArticles = data.articles.filter(article =>
            (article.source.name && article.source.name.toLowerCase().includes(search.toLowerCase())) ||
            (article.author && article.author.toLowerCase().includes(search.toLowerCase())) ||
            (article.title && article.title.toLowerCase().includes(search.toLowerCase()))
        );

        setNewsData(filteredArticles);
        console.log(filteredArticles);
    }

    return (
        <>
            <div>
                <div className="container mt-4">
                    <h2 className='text-center my-3'>News</h2>
                    <div className="row justify-content-md-center">
                        <div className="col-md-3">
                            <select className="form-control" style={{ cursor: 'pointer' }} value={country} onChange={selectCountry}>
                                <option value="">Select Country</option>
                                {countryOptions.map((country) => (
                                    <option key={country} value={country}>
                                        {country.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <select className="form-control" style={{ cursor: 'pointer' }} value={category} onChange={selectCategory}>
                                <option value="">Select Category</option>
                                {categoryOptions.map((category) => (
                                    <option key={category} value={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary" onClick={handleSearch}>
                                Search
                            </button>
                            <button className="btn btn-primary ms-2" onClick={clearSearch}>
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {newsData.length !== 0 && <div className="container mt-5">
                <div className="row mt-3">
                    <div className="col-md-4"></div>
                    <div className="col-md-2">
                        <input type="text" className='form-control' onChange={e => setSearch(e.target.value)} value={search} />
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-primary" onClick={searchNews}>Search</button>
                        <button className="btn btn-primary ms-2" onClick={ClearGridSearch}>
                            Clear
                        </button>
                    </div>

                </div>
            </div>}

            <div>
                {newsData.length === 0 ? <h3 className="text-center my-5">No News Found</h3> :
                    <div className="container mt-3">
                        <table className="table table-striped table-bordered table-hover mt-3">
                            <thead>
                                <tr>
                                    <th onClick={sortNewsData}>Source<span style={{ cursor: 'pointer' }}> ↕️</span></th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Author</th>
                                    <th>Date</th>
                                    <th>URL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {newsData && newsData.map((element) => {
                                    return <NewsCard key={element.url} source={element.source.name} imageUrl={element.urlToImage} title={element.title} description={element.description === null ? 'No Description' : element.description} author={element.author} date={element.publishedAt} newsUrl={element.url} />
                                })}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </>
    )
}

export default NewsItem
