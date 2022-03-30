import React, { Component } from 'react';
import './components.css';
import { variables } from './Variables';

export class LibraryItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      libraryitems: [],
      modalTitle: '',
      Id: 0,
      CategoryId: '',
      CategoryName: '',
      Title: '',
      Author: '',
      Pages: '',
      RunTimeMinutes: '',
      IsBorrowable: '',
      Borrower: '',
      BorrowDate: '',
      Type: '',
      SortToggle: true,
      isBorrowed: false,
    };
  }

  //Fetching Both libraryitems and categories API.
  refreshList() {
    fetch(variables.API_URL + 'libraryitem')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ libraryitems: data });
      });
    fetch(variables.API_URL + 'category')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ categories: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  //Function to sort by Type of library item or by CategoryName.
  sortByType(sort) {
    if (sort === false) {
      return (a, b) => (a.Type > b.Type ? 1 : -1);
    } else {
      return (a, b) => (a.CategoryName > b.CategoryName ? 1 : -1);
    }
  }
  //#region onClick Change Functions, Setting all the states.
  //Filters through the categories to find the CategoryName that was selected and then set the Id of that Category to CategoryId.
  changeCategoryId = (e) => {
    this.setState({
      CategoryId: this.state.categories.filter(
        (a) => a.CategoryName === e.target.value
      )[0].Id,
    });
    this.setState({ CategoryName: e.target.value });
  };
  changeTitle = (e) => {
    this.setState({ Title: e.target.value });
  };
  //Only allow letters.
  changeAuthor = (e) => {
    if (/^[A-za-z\s]*$/.test(e.target.value)) {
      this.setState({ Author: e.target.value });
    } else {
      alert('Only letters are allowed.');
    }
  };
  changePages = (e) => {
    this.setState({ Pages: e.target.value });
  };
  changeRunTimeMinutes = (e) => {
    this.setState({ RunTimeMinutes: e.target.value });
  };
  //Only allow letters.
  changeBorrower = (e) => {
    if (/^[A-za-z\s]*$/.test(e.target.value)) {
      this.setState({ Borrower: e.target.value });
    } else {
      alert('Only letters are allowed.');
    }
  };
  //Only allow numbers and dash (-).
  changeBorrowDate = (e) => {
    if (/^[0-9-]*$/.test(e.target.value)) {
      this.setState({ BorrowDate: e.target.value });
    } else {
      alert('Only numbers 0-9 and dashes (-).');
    }
  };
  changeType = (e) => {
    this.setState({ Type: e.target.value });
  };
  //#endregion

  //#region Click API Functions, Pretty straight forward. Adding, editing and deleting libraryitems by using POST, PUT and DELETE.
  addBook() {
    this.setState({
      modalTitle: 'Add Book',
      Id: 0,
      CategoryId: '',
      Title: '',
      Author: '',
      Pages: '',
      IsBorrowable: 'true',
      Type: 'Book',
    });
  }
  addDVD() {
    this.setState({
      modalTitle: 'Add DVD',
      Id: 0,
      CategoryId: '',
      Title: '',
      RunTimeMinutes: '',
      IsBorrowable: 'true',
      Type: 'DVD',
    });
  }
  addAudioBook() {
    this.setState({
      modalTitle: 'Add Audio Book',
      Id: 0,
      CategoryId: '',
      Title: '',
      RunTimeMinutes: '',
      IsBorrowable: 'true',
      Type: 'Audio Book',
    });
  }
  addReferenceBook() {
    this.setState({
      modalTitle: 'Add Reference Book',
      Id: 0,
      CategoryId: '',
      Title: '',
      Author: '',
      Pages: '',
      IsBorrowable: 'false',
      Type: 'Reference Book',
    });
  }
  editClick(libraryItem) {
    this.setState({
      modalTitle: 'Edit LibraryItem',
      Id: libraryItem.Id,
      CategoryId: libraryItem.CategoryId,
      Title: libraryItem.Title,
      Author: libraryItem.Author,
      Pages: libraryItem.Pages,
      RunTimeMinutes: libraryItem.RunTimeMinutes,
      IsBorrowable: libraryItem.IsBorrowable,
      Borrower: libraryItem.Borrower,
      BorrowDate: libraryItem.BorrowDate,
      Type: libraryItem.Type,
    });
  }
  createClick() {
    fetch(variables.API_URL + 'libraryitem', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        CategoryId: this.state.CategoryId,
        Title: this.state.Title,
        Author: this.state.Author,
        Pages: this.state.Pages,
        RunTimeMinutes: this.state.RunTimeMinutes,
        IsBorrowable: this.state.IsBorrowable,
        Borrower: this.state.Borrower,
        BorrowDate: this.state.BorrowDate,
        Type: this.state.Type,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert('Failed');
        }
      );
  }
  updateClick() {
    fetch(variables.API_URL + 'libraryitem', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Id: this.state.Id,
        CategoryId: this.state.CategoryId,
        Title: this.state.Title,
        Author: this.state.Author,
        Pages: this.state.Pages,
        RunTimeMinutes: this.state.RunTimeMinutes,
        IsBorrowable: this.state.IsBorrowable,
        Borrower: this.state.Borrower,
        BorrowDate: this.state.BorrowDate,
        Type: this.state.Type,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert('Failed');
        }
      );
  }
  deleteClick(Id) {
    if (window.confirm('Are you sure?')) {
      fetch(variables.API_URL + 'libraryitem/' + Id, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert('Failed');
          }
        );
    }
  }
  checkinClick() {
    fetch(variables.API_URL + 'libraryitem', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Id: this.state.Id,
        CategoryId: this.state.CategoryId,
        Title: this.state.Title,
        Author: this.state.Author,
        Pages: this.state.Pages,
        RunTimeMinutes: this.state.RunTimeMinutes,
        IsBorrowable: this.state.IsBorrowable,
        Borrower: '',
        BorrowDate: '',
        Type: this.state.Type,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert('Failed');
        }
      );
  }
  //#endregion

  render() {
    const {
      libraryitems,
      modalTitle,
      Id,
      CategoryName,
      Title,
      Author,
      Pages,
      RunTimeMinutes,
      IsBorrowable,
      Borrower,
      BorrowDate,
      Type,
    } = this.state;
    return (
      <div id="category-list">
        {/* Buttons to add different libraryitems (Book, DVD, Audio Book, Reference Book) and open a different modal window for each different item. */}
        <button
          type="button"
          id="addLibraryItemBtn"
          className="btn"
          data-bs-toggle="modal"
          data-bs-target="#BookModal"
          onClick={() => this.addBook()}
        >
          Add Book
        </button>
        <button
          type="button"
          id="addLibraryItemBtn"
          className="btn"
          data-bs-toggle="modal"
          data-bs-target="#dvdModal"
          onClick={() => this.addDVD()}
        >
          Add DVD
        </button>
        <button
          type="button"
          id="addLibraryItemBtn"
          className="btn"
          data-bs-toggle="modal"
          data-bs-target="#abModal"
          onClick={() => this.addAudioBook()}
        >
          Add Audio Book
        </button>
        <button
          type="button"
          id="addLibraryItemBtn"
          className="btn"
          data-bs-toggle="modal"
          data-bs-target="#rbModal"
          onClick={() => this.addReferenceBook()}
        >
          Add Reference Book
        </button>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              {/* By clicking on the underlined column "CategoryName" you will call the sortfunction and sort the items based of the CategoryName. */}
              <th id="sort" onClick={() => this.setState({ SortToggle: true })}>
                CategoryName
              </th>
              <th>Title</th>
              <th>Author</th>
              <th>Pages</th>
              <th>RunTimeMinutes</th>
              <th>IsBorrowable</th>
              <th>Borrower</th>
              <th>BorrowDate</th>
              {/* By clicking on the underlined column "Type" you will call the sortfunction and sort the items based of the Type. */}
              <th
                id="sort"
                onClick={() => this.setState({ SortToggle: false })}
              >
                Type
              </th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* Using my sort function in the sort attribute to sort and then map all the libraryitems. */}
            {libraryitems
              .sort(this.sortByType(this.state.SortToggle))
              .map((libraryItem) => (
                <tr key={libraryItem.Id}>
                  <td>{libraryItem.Id}</td>
                  <td>{libraryItem.CategoryName}</td>
                  {/* Create an acronym of the Item Title by splitting and reducing each word after the first letter. */}
                  <td>
                    {libraryItem.Title +
                      ' ' +
                      '(' +
                      libraryItem.Title.split(/\s/).reduce(
                        (response, word) => (response += word.slice(0, 1)),
                        ''
                      ) +
                      ')'}
                  </td>
                  <td>{libraryItem.Author}</td>
                  {/* Using  JSON Stringify to show the values that are true,false and null.*/}
                  <td>{JSON.stringify(libraryItem.Pages)}</td>
                  <td>{JSON.stringify(libraryItem.RunTimeMinutes)}</td>
                  <td>{JSON.stringify(libraryItem.IsBorrowable)}</td>
                  <td>{libraryItem.Borrower}</td>
                  <td>{libraryItem.BorrowDate}</td>
                  <td>{libraryItem.Type}</td>
                  <td>
                    <button
                      className="btn"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                      onClick={() => this.editClick(libraryItem)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn"
                      type="button"
                      onClick={() => this.deleteClick(libraryItem.Id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* Decided to use a modal window to add and edit libraryitems. Also decided to use OnChange methods to set all the states. */}
        {/* This is the editing modal window where you can edit most fields. */}
        <div
          className="modal fade"
          id="myModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">CategoryId</span>
                  <select
                    className="form-select"
                    onChange={this.changeCategoryId}
                    value={CategoryName}
                  >
                    <option>-Select-</option>
                    {/* Map Category Names and then change them in the function above into CategoryId. */}
                    {this.state.categories.map((lib) => (
                      <option key={lib.Id}>{lib.CategoryName}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Title</span>
                  <input
                    type="text"
                    className="form-control"
                    value={Title}
                    onChange={this.changeTitle}
                    required
                    placeholder="Title"
                  />
                </div>
                {/* If the item is a Book or Reference Book then you should be able to add a Author, otherwise you should not. */}
                {Type === 'Book' || Type === 'Reference Book' ? (
                  <div className="input-group mb-3">
                    <span className="input-group-text">Author</span>
                    <input
                      type="text"
                      className="form-control"
                      value={Author}
                      onChange={this.changeAuthor}
                    />
                  </div>
                ) : null}
                {/* If the item is a Book then you should be able to add number of Pages, otherwise you should not. */}
                {Type === 'Book' ? (
                  <div className="input-group mb-3">
                    <span className="input-group-text">Pages</span>
                    <input
                      type="number"
                      className="form-control"
                      value={Pages}
                      onChange={this.changePages}
                    />
                  </div>
                ) : null}
                {/* If the item is a Audio Book or DVD you should be able to add RunTimeMinutes, otherwise you should not. */}
                {Type === 'Audio Book' || Type === 'DVD' ? (
                  <div className="input-group mb-3">
                    <span className="input-group-text">RunTimeMinutes</span>
                    <input
                      type="number"
                      className="form-control"
                      value={RunTimeMinutes}
                      onChange={this.changeRunTimeMinutes}
                    />
                  </div>
                ) : null}
                {/* If the item is NOT a Reference Book then you should be able to set a Borrower, otherwise you should not, since Reference Books arent Borrowable. */}
                {Type !== 'Reference Book' &&
                this.state.isBorrowed === false ? (
                  <div className="input-group mb-3">
                    <span className="input-group-text">Borrower</span>
                    <input
                      type="text"
                      className="form-control"
                      value={Borrower}
                      onChange={this.changeBorrower}
                    />
                  </div>
                ) : null}
                {/* If the item is NOT a Reference Book then you should be able to set a BorrowDate, otherwise you should not, since Reference Books arent Borrowable. */}
                {Type !== 'Reference Book' &&
                this.state.isBorrowed === false ? (
                  <div className="input-group mb-3">
                    <span className="input-group-text">BorrowDate</span>
                    <input
                      type="text"
                      className="form-control"
                      value={BorrowDate}
                      onChange={this.changeBorrowDate}
                      placeholder="YYYY-MM-DD"
                      //pattern="^[0-9-]*$"
                      pattern="\d{1,2}-\d{1,2}-\d{4}"
                    />
                  </div>
                ) : null}
                <div className="input-group mb-3">
                  <span className="input-group-text">Type</span>
                  <select
                    className="form-select"
                    onChange={this.changeType}
                    value={Type}
                  >
                    <option>-Select Type-</option>
                    <option value="Book">Book</option>
                    <option value="DVD">DVD</option>
                    <option value="Audio Book">Audio Book</option>
                    <option value="Reference Book">Reference Book</option>
                  </select>
                </div>
                {/* If it is a new item you are adding then the create button should show. */}
                {Id === 0 ? (
                  <button
                    type="button"
                    className="btnDark"
                    onClick={() => this.createClick()}
                  >
                    Create
                  </button>
                ) : null}
                {/* If it is an already existing item that you are editing then the update button should show. */}
                {Id !== 0 ? (
                  <button
                    type="button"
                    className="btnDark"
                    onClick={() => this.updateClick()}
                  >
                    Update
                  </button>
                ) : null}
                {/* If it is an already existing item that you are editing and want to checkout, and the item is borrowable, then the checkout button should show. */}
                {Id !== 0 &&
                IsBorrowable === true &&
                this.state.isBorrowed === false &&
                this.state.Borrower !== '' ? (
                  <button
                    type="button"
                    className="btnDark"
                    onClick={() => {
                      this.updateClick();
                      this.setState({ isBorrowed: true });
                    }}
                  >
                    Checkout
                  </button>
                ) : null}
                {/* If the item is currently borrowed, the checkin button should show so that you are able to check it in. */}
                {Id !== 0 && IsBorrowable === true ? (
                  <button
                    type="button"
                    className="btnDark"
                    onClick={() => {
                      this.checkinClick();
                      this.setState({ isBorrowed: false });
                    }}
                  >
                    CheckIn
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        {/* Book Modal */}
        <div
          className="modal fade"
          id="BookModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">CategoryId</span>
                  <select
                    className="form-select"
                    onChange={this.changeCategoryId}
                    value={CategoryName}
                  >
                    <option>-Select-</option>
                    {/* Map Category Names and then change them in the function above into CategoryId. */}
                    {this.state.categories.map((lib) => (
                      <option key={lib.Id}>{lib.CategoryName}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Title</span>
                  <input
                    type="text"
                    className="form-control"
                    value={Title}
                    onChange={this.changeTitle}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Author</span>
                  <input
                    type="text"
                    className="form-control"
                    value={Author}
                    onChange={this.changeAuthor}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Pages</span>
                  <input
                    type="number"
                    className="form-control"
                    value={Pages}
                    onChange={this.changePages}
                    required
                  />
                </div>
                {/* If it is a new item you are adding then the create button should show. */}
                {Id === 0 ? (
                  <button
                    type="button"
                    className="btnDark"
                    onClick={() => this.createClick()}
                  >
                    Create
                  </button>
                ) : null}
                {/* If it is an already existing item that you are editing then the update button should show. */}
                {Id !== 0 ? (
                  <button
                    type="button"
                    className="btnDark"
                    onClick={() => this.updateClick()}
                  >
                    Update
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        {/* DVD Modal */}
        <div
          className="modal fade"
          id="dvdModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">CategoryId</span>
                  <select
                    className="form-select"
                    onChange={this.changeCategoryId}
                    value={CategoryName}
                  >
                    <option>-Select-</option>
                    {/* Map Category Names and then change them in the function above into CategoryId. */}
                    {this.state.categories.map((lib) => (
                      <option key={lib.Id}>{lib.CategoryName}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Title</span>
                  <input
                    type="text"
                    className="form-control"
                    value={Title}
                    onChange={this.changeTitle}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">RunTimeMinutes</span>
                  <input
                    type="number"
                    className="form-control"
                    value={RunTimeMinutes}
                    onChange={this.changeRunTimeMinutes}
                    required
                  />
                </div>
                {/* If it is a new item you are adding then the create button should show. */}
                {Id === 0 ? (
                  <button
                    type="button"
                    className="btnDark"
                    onClick={() => this.createClick()}
                  >
                    Create
                  </button>
                ) : null}
                {/* If it is an already existing item that you are editing then the update button should show. */}
                {Id !== 0 ? (
                  <button
                    type="button"
                    className="btnDark"
                    onClick={() => this.updateClick()}
                  >
                    Update
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        {/* Audio Book Modal */}
        <div
          className="modal fade"
          id="abModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">CategoryId</span>
                  <select
                    className="form-select"
                    onChange={this.changeCategoryId}
                    value={CategoryName}
                  >
                    <option>-Select-</option>
                    {/* Map Category Names and then change them in the function above into CategoryId. */}
                    {this.state.categories.map((lib) => (
                      <option key={lib.Id}>{lib.CategoryName}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Title</span>
                  <input
                    type="text"
                    className="form-control"
                    value={Title}
                    onChange={this.changeTitle}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Author</span>
                  <input
                    type="text"
                    className="form-control"
                    value={Author}
                    onChange={this.changeAuthor}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">RunTimeMinutes</span>
                  <input
                    type="number"
                    className="form-control"
                    value={RunTimeMinutes}
                    onChange={this.changeRunTimeMinutes}
                    required
                  />
                </div>
                {/* If it is a new item you are adding then the create button should show. */}
                {Id === 0 ? (
                  <button
                    type="button"
                    className="btnDark"
                    onClick={() => this.createClick()}
                  >
                    Create
                  </button>
                ) : null}
                {/* If it is an already existing item that you are editing then the update button should show. */}
                {Id !== 0 ? (
                  <button
                    type="button"
                    className="btnDark"
                    onClick={() => this.updateClick()}
                  >
                    Update
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        {/* Reference Book Modal */}
        <div
          className="modal fade"
          id="rbModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">CategoryId</span>
                  <select
                    className="form-select"
                    onChange={this.changeCategoryId}
                    value={CategoryName}
                  >
                    <option>-Select-</option>
                    {/* Map Category Names and then change them in the function above into CategoryId. */}
                    {this.state.categories.map((lib) => (
                      <option key={lib.Id}>{lib.CategoryName}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Title</span>
                  <input
                    type="text"
                    className="form-control"
                    value={Title}
                    onChange={this.changeTitle}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Author</span>
                  <input
                    type="text"
                    className="form-control"
                    value={Author}
                    onChange={this.changeAuthor}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Pages</span>
                  <input
                    type="number"
                    className="form-control"
                    value={Pages}
                    onChange={this.changePages}
                    required
                  />
                </div>
                {/* If it is a new item you are adding then the create button should show. */}
                {Id === 0 ? (
                  <button
                    type="button"
                    className="btnDark"
                    onClick={() => this.createClick()}
                  >
                    Create
                  </button>
                ) : null}
                {/* If it is an already existing item that you are editing then the update button should show. */}
                {Id !== 0 ? (
                  <button
                    type="button"
                    className="btnDark"
                    onClick={() => this.updateClick()}
                  >
                    Update
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
