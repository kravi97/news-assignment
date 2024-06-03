import React from 'react'

function NewsCard({ title, description, imageUrl, newsUrl, author, date, source }) {
    return (
        <tr>
            <td>{source}</td>
            <td>
                <img src={!imageUrl ? 'https://static.toiimg.com/thumb/msid-110436182,width-1070,height-580,imgsize-525399,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg' : imageUrl} alt="..." style={{ width: '100px' }} />
            </td>
            <td>{title}</td>
            <td>{description}</td>
            <td>{!author ? 'unknown' : author}</td>
            <td>{new Date(date).toGMTString()}</td>
            <td>
                <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
            </td>
        </tr>
    )
}

export default NewsCard