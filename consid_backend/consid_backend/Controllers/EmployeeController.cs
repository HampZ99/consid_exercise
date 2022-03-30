using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using consid_backend.Models;

namespace consid_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public EmployeeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                SELECT 
                    Id, FirstName, LastName, Salary, IsCEO, IsManager, ManagerId 
                FROM 
                    dbo.Employees
            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        [HttpPut]
        public JsonResult Put(Employee employee)
        {
            string query = @"
                UPDATE
                    dbo.Employees
                SET
                    FirstName=@FirstName, LastName=@LastName, Salary=@Salary, IsCEO=@IsCeo, IsManager=@IsManager, ManagerId=@ManagerId
                WHERE
                    Id=@Id
            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Id", employee.Id);
                    myCommand.Parameters.AddWithValue("@FirstName", employee.FirstName);
                    myCommand.Parameters.AddWithValue("@LastName", employee.LastName);
                    myCommand.Parameters.AddWithValue("@Salary", employee.Salary);
                    myCommand.Parameters.AddWithValue("@IsCEO", employee.IsCEO);
                    myCommand.Parameters.AddWithValue("@IsManager", employee.IsManager);
                    if (employee.ManagerId != null)
                    {
                        myCommand.Parameters.AddWithValue("@ManagerId", employee.ManagerId);
                    }
                    else
                    {
                        myCommand.Parameters.AddWithValue("@ManagerId", DBNull.Value);
                    }
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Employee has been successfully updated.");
        }
        [HttpPost]
        public JsonResult Post(Employee employee)
        {
            string query = @"
                INSERT INTO 
                    dbo.Employees
                        (FirstName, LastName, Salary, IsCEO, IsManager, ManagerId)
                VALUES 
                    (@FirstName, @LastName, @Salary, @IsCEO, @IsManager, @ManagerId)
            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@FirstName", employee.FirstName);
                    myCommand.Parameters.AddWithValue("@LastName", employee.LastName);
                    myCommand.Parameters.AddWithValue("@Salary", employee.Salary);
                    myCommand.Parameters.AddWithValue("@IsCEO", employee.IsCEO);
                    myCommand.Parameters.AddWithValue("@IsManager", employee.IsManager);
                    if(employee.ManagerId != null)
                    {
                        myCommand.Parameters.AddWithValue("@ManagerId", employee.ManagerId);
                    }
                    else
                    {
                        myCommand.Parameters.AddWithValue("@ManagerId", DBNull.Value);
                    }
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Employee has been successfully added.");
        }
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                DELETE FROM dbo.Employees
                WHERE Id=@Id
            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Id", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Employee has been successfully deleted.");
        }
    }
}
