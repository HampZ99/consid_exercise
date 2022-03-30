import React, { Component } from 'react';
import { variables } from './Variables';
import './components.css';

export class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      libraryitems: [],
      categories: [],
      modalTitle: '',
      CategoryName: '',
      Id: 0,
    };
  }

  //Fetching the API
  refreshList() {
    fetch(variables.API_URL + 'category')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ categories: data });
      });
  }
  //Fetching the Library Item API to be able to reference it with the categories.
  fetchLibraryItem() {
    fetch(variables.API_URL + 'libraryitem')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ libraryitems: data });
      });
  }

  componentDidMount() {
    this.refreshList();
    this.fetchLibraryItem();
  }

  //Check if the Category already exists.
  changeCategoryName = (e) => {
    if (
      this.state.categories.some(
        (i) => i.CategoryName.toLowerCase() === e.target.value.toLowerCase()
      )
    ) {
      alert('This category already exists.');
    } else {
      this.setState({ CategoryName: e.target.value });
    }
  };

  //#region Click API Functions, Pretty straight forward. Adding, editing and deleting categories by using POST, PUT and DELETE.
  addClick() {
    this.setState({
      modalTitle: 'Add Category',
      Id: 0,
      CategoryName: '',
    });
  }
  editClick(category) {
    this.setState({
      modalTitle: 'Edit Category',
      Id: category.Id,
      CategoryName: category.CategoryName,
    });
  }
  createClick() {
    fetch(variables.API_URL + 'category', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        CategoryName: this.state.CategoryName,
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
    fetch(variables.API_URL + 'category', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Id: this.state.Id,
        CategoryName: this.state.CategoryName,
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
    if (this.state.libraryitems.some((i) => i.CategoryId === Id)) {
      alert(
        'Cannot delete this category because it is referred to in a libraryitem.'
      );
    } else {
      if (window.confirm('Are you sure?')) {
        fetch(variables.API_URL + 'category/' + Id, {
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
  }
  //#endregion

  render() {
    const { categories, modalTitle, CategoryName, Id } = this.state;
    return (
      <div id="category-list">
        <button
          type="button"
          id="addCategoryBtn"
          className="btn"
          data-bs-toggle="modal"
          data-bs-target="#myModal"
          onClick={() => this.addClick()}
        >
          Add Category
        </button>
        <table>
          <thead>
            <tr>
              <th>CategoryId</th>
              <th>CategoryName</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* Map all the categories. */}
            {categories.map((category) => (
              <tr key={category.Id}>
                <td>{category.Id}</td>
                <td>{category.CategoryName}</td>
                <td>
                  <button
                    className="btn"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    onClick={() => this.editClick(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn"
                    type="button"
                    onClick={() => this.deleteClick(category.Id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Decided to use a modal window to add and edit categories. Also decided to use OnChange methods to set all the states. */}
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
                  <span className="input-group-text">CategoryName</span>
                  <input
                    type="text"
                    className="form-control"
                    value={CategoryName}
                    onChange={this.changeCategoryName}
                  />
                </div>
                {Id === 0 ? (
                  <button
                    type="button"
                    className="btnDark"
                    onClick={() => this.createClick()}
                  >
                    Create
                  </button>
                ) : null}
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
