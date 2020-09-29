import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  showInfo,
  closeInfo,
  setBookId,
  setBooks,
  resetBook
} from '../Components/redux/actions/booksActions'
import { addBookToDB, getData } from '../api/booksApi'
import { Link } from 'react-router-dom'

const Wrapper = ({ childStyle, children, ...viewProps }) => (
  <div {...viewProps}>
    {React.Children.map(children, child =>
      React.cloneElement(child, {
        style: [child.props.style, childStyle]
      })
    )}
  </div>
)

const AddNewBook = ({ value, showAddBook }) => {
  const dispatch = useDispatch()
  const [data, setBookData] = useState({
    title: '',
    author: '',
    desc: '',
    pages: '',
    print: '',
    price: '',
    date: '',
    cover: ''
  })

  const handleCmsValue = e => {
    const name = e.target.name
    const value = e.target.value
    const file = e.target.files
    let newData
    if (file) {
      newData = { ...data, cover: file[0] }
    } else {
      newData = { ...data, [name]: value }
    }
    setBookData(newData)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const { author, title, desc, pages, print, price, cover, date } = data

    const bookData = {
      author,
      title,
      desc,
      pages,
      print,
      price,
      cover,
      date,
      total: '0',
      count: '0',
      isActive: false
    }

    addBookToDB(bookData).then(res => {
      dispatch(resetBook())
      getData().then(books => {
        dispatch(setBooks(books))
      })
      dispatch(showInfo(res))
      setTimeout(() => {
        dispatch(closeInfo())
      }, 2000)
    })
  }

  return (
    <>
      <button
        onClick={() => showAddBook(true)}
        className='secondary-btn btn-add-book'
      >
        Add new customer to the database
      </button>
      {value && (
        <div className='show-modal'>
          <div>
            <form onSubmit={handleSubmit} className='cms-form'>
              <div className='close' onClick={() => showAddBook(false)}>
                <i className='far fa-times-circle'></i>
              </div>
              <label>כתובת</label>
              <input
                type='text'
                value={data.adress}
                name='adress'
                onChange={handleCmsValue}
              />
              <label>סוג נכס</label>
              <input
                type='text'
                value={data.title}
                name='assetType'
                onChange={handleCmsValue}
              />
              <label>תמונות</label>
              <input type='file' name='image' onChange={handleCmsValue} />
              <label>מחיר</label>
              <textarea
                name='price'
                value={data.price}
                onChange={handleCmsValue}
              ></textarea>
              <label>חדרים</label>
              <input
                type='rooms'
                value={data.rooms}
                name='rooms'
                onChange={handleCmsValue}
              />
              <label>מ״ר</label>
              <input
                type='text'
                value={data.sqrFeet}
                name='sqrFeet'
                onChange={handleCmsValue}
              />
              <label>קומה</label>
              <input
                type='text'
                value={data.floor}
                name='floor'
                onChange={handleCmsValue}
              />

              <Wrapper
                style={{ flexDirection: 'row' }}
                childStyle={{ margin: 8 }}
              >
                <label>מיזוג</label>
                <input
                  type='checkbox'
                  value={true}
                  name='airCondition'
                  onChange={handleCmsValue}
                />
                <label>מעלית</label>
                <input
                  type='checkbox'
                  value={true}
                  name='elevator'
                  onChange={handleCmsValue}
                />
                <label>ריהוט</label>
                <input
                  type='checkbox'
                  value={true}
                  name='furniture'
                  onChange={handleCmsValue}
                />
              </Wrapper>
              <input
                type='checkbox'
                value={true}
                name='furniture'
                onChange={handleCmsValue}
              />
              <button className='cms-button'>Send Data</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
export default AddNewBook
