import React, { Component } from 'react';
import { variables } from './Variables';
import './components.css';

export class Employee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      modalTitle: '',
      Id: 0,
      FirstName: '',
      LastName: '',
      Salary: '',
      IsCEO: false,
      IsManager: '',
      ManagerId: '',
      Rank: '',
      NumberRankList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  }

  //Fetching the API
  refreshList() {
    fetch(variables.API_URL + 'employee')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ employees: data });
      });
  }
  //Function to sort by role so that CEO shows at the top and Managers secondly and lastly regular employees.
  sortByRole(a, b) {
    if (a.IsCEO < b.IsCEO) {
      return 1;
    } else if (a.IsCEO > b.IsCEO) {
      return -1;
    }
    if (a.IsManager > b.IsManager) {
      return -1;
    } else if (a.IsManager < b.IsManager) {
      return 1;
    } else {
      return 0;
    }
  }

  componentDidMount() {
    this.refreshList();
  }

  //#region onClick Change Functions, Setting all the states.
  //Only allow letters.
  changeFirstName = (e) => {
    if (/^[A-za-z\s]*$/.test(e.target.value)) {
      this.setState({ FirstName: e.target.value });
    } else {
      alert('Only letters are allowed.');
    }
  };
  //Only allow letters.
  changeLastName = (e) => {
    if (/^[A-za-z\s]*$/.test(e.target.value)) {
      this.setState({ LastName: e.target.value });
    } else {
      alert('Only letters are allowed.');
    }
  };
  //Setting the salary based off the salary coefficient.
  changeSalary = (e) => {
    if (this.state.IsCEO === true) {
      this.setState({ Salary: e.target.value * 2.725 });
    } else if (this.state.IsCEO !== true && this.state.IsManager === true) {
      this.setState({ Salary: e.target.value * 1.725 });
    } else {
      this.setState({ Salary: e.target.value * 1.125 });
    }
  };
  changeIsCEO = (e) => {
    this.setState({ IsCEO: e.target.value });
  };
  changeIsManager = (e) => {
    this.setState({ IsManager: e.target.value });
  };
  //Since the Select List is of all the Managers names, this function will input the Id of the employees name that was selected.
  changeManagerId = (e) => {
    this.setState({
      ManagerId: this.state.employees.filter(
        (x) => x.FirstName === e.target.value
      )[0].Id,
    });
  };
  //#endregion
  //#region Click API Functions, Pretty straight forward. Adding, editing and deleting employees by using POST, PUT and DELETE.
  addClick() {
    this.setState({
      modalTitle: 'Add Employee',
      Id: 0,
      FirstName: '',
      LastName: '',
      Salary: '',
      IsCEO: false,
      IsManager: '',
      ManagerId: '',
    });
  }
  editClick(employee) {
    this.setState({
      modalTitle: 'Edit Employee',
      Id: employee.Id,
      FirstName: employee.FirstName,
      LastName: employee.LastName,
      Salary: employee.Salary,
      IsCEO: employee.IsCEO,
      IsManager: employee.IsManager,
      ManagerId: employee.ManagerId,
    });
  }
  createClick() {
    fetch(variables.API_URL + 'employee', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        Salary: this.state.Salary,
        IsCEO: this.state.IsCEO,
        IsManager: this.state.IsManager,
        ManagerId: this.state.ManagerId,
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
    fetch(variables.API_URL + 'employee', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Id: this.state.Id,
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        Salary: this.state.Salary,
        IsCEO: this.state.IsCEO,
        IsManager: this.state.IsManager,
        ManagerId: this.state.ManagerId,
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
    if (this.state.employees.some((i) => i.ManagerId === Id)) {
      alert(
        'Cannot delete this employee because they are managing other employees.'
      );
    } else {
      if (window.confirm('Are you sure?')) {
        fetch(variables.API_URL + 'employee/' + Id, {
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
    const {
      employees,
      modalTitle,
      Id,
      FirstName,
      LastName,
      numb,
      IsCEO,
      IsManager,
    } = this.state;
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
          Add Employee
        </button>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Salary</th>
              <th>IsCEO</th>
              <th>IsManager</th>
              <th>ManagerId</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* Using my sort function in the sort attribute to sort and then map all the employees. */}
            {employees.sort(this.sortByRole).map((employee) => (
              <tr key={employee.Id}>
                <td>{employee.Id}</td>
                <td>{employee.FirstName}</td>
                <td>{employee.LastName}</td>
                <td>{'$' + employee.Salary}</td>
                {/* Using  JSON Stringify to show the values that are true,false and null.*/}
                <td>{JSON.stringify(employee.IsCEO)}</td>
                <td>{JSON.stringify(employee.IsManager)}</td>
                <td>{JSON.stringify(employee.ManagerId)}</td>
                <td>
                  <button
                    className="btn"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    onClick={() => this.editClick(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn"
                    type="button"
                    onClick={() => this.deleteClick(employee.Id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Decided to use a modal window to add and edit employees. Also decided to use OnChange methods to set all the states. */}
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
                  <span className="input-group-text">FirstName</span>
                  <input
                    type="text"
                    className="form-control"
                    value={FirstName}
                    onChange={this.changeFirstName}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">LastName</span>
                  <input
                    type="text"
                    className="form-control"
                    value={LastName}
                    onChange={this.changeLastName}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Rank</span>
                  <select
                    className="form-select"
                    onChange={this.changeSalary}
                    value={numb}
                  >
                    <option>-Select-</option>
                    {/* Map through all the numbers in the array to display an option for every number 1-10 */}
                    {this.state.NumberRankList.map((numb) => (
                      <option key={numb}>{numb}</option>
                    ))}
                  </select>
                </div>
                {/* If there is already someone who is a CEO then you should not be able to add another one. */}
                {this.state.employees.filter((x) => x.IsCEO === true).length !==
                1 ? (
                  <div className="input-group mb-3">
                    <span className="input-group-text">IsCEO</span>
                    <select
                      className="form-select"
                      onChange={this.changeIsCEO}
                      value={IsCEO}
                    >
                      <option>-Select-</option>
                      <option>true</option>
                      <option>false</option>
                    </select>
                  </div>
                ) : null}
                <div className="input-group mb-3">
                  <span className="input-group-text">IsManager</span>
                  <select
                    className="form-select"
                    onChange={this.changeIsManager}
                    value={IsManager}
                  >
                    <option>-Select-</option>
                    <option>true</option>
                    <option>false</option>
                  </select>
                </div>
                {/* If you are NOT a CEO then you can select a Manager. */}
                {IsCEO === false ? (
                  <div className="input-group mb-3">
                    <span className="input-group-text">ManagerId</span>
                    <select
                      className="form-select"
                      onChange={this.changeManagerId}
                      value={FirstName}
                    >
                      <option>-Select-</option>
                      {/* If you are a manager then you can only be managed by other managers or the CEO. */}
                      {IsManager === true ? (
                        <>
                          {/* The filter will filter through all employees that are CEOs and Managers and remove yourself (you can obviously not manage yourself) and then show options based off that. */}
                          {this.state.employees
                            .filter(
                              (x) =>
                                x.IsCEO === true ||
                                (x.IsManager === true && x.Id !== Id)
                            )
                            .map((ceos) => (
                              <option key={ceos.Id}>{ceos.FirstName}</option>
                            ))}
                        </>
                      ) : (
                        <>
                          {/* If you are a regular employee you should only be managed by managers. The filter will filter through all the managers and show options based off that. */}
                          {this.state.employees
                            .filter(
                              (x) => x.IsManager === true && x.IsCEO === false
                            )
                            .map((managers) => (
                              <option key={managers.Id}>
                                {managers.FirstName}
                              </option>
                            ))}
                        </>
                      )}
                    </select>
                  </div>
                ) : null}
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
