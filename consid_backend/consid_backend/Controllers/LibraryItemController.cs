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
    public class LibraryItemController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public LibraryItemController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        //GET METHOD
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                SELECT 
                    LibraryItem.Id, LibraryItem.CategoryId, Category.CategoryName, LibraryItem.Title, LibraryItem.Author, LibraryItem.Pages, LibraryItem.RunTimeMinutes, LibraryItem.IsBorrowable, LibraryItem.Borrower, LibraryItem.BorrowDate, LibraryItem.Type 
                FROM 
                    dbo.Category
                INNER JOIN
                    dbo.LibraryItem
                ON Category.Id = LibraryItem.CategoryId
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
        //PUT METHOD
        [HttpPut]
        public JsonResult Put(LibraryItem libraryItem)
        {
            string query = @"
                UPDATE 
                    dbo.LibraryItem
                SET
                    CategoryId=@CategoryId, Title=@Title, Author=@Author, Pages=@Pages, RunTimeMinutes=@RunTimeMinutes, IsBorrowable=@IsBorrowable, Borrower=@Borrower, BorrowDate=@BorrowDate, Type=@Type
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
                    myCommand.Parameters.AddWithValue("@Id", libraryItem.Id);
                    myCommand.Parameters.AddWithValue("@CategoryId", libraryItem.CategoryId);
                    myCommand.Parameters.AddWithValue("@Title", libraryItem.Title);
                    myCommand.Parameters.AddWithValue("@Author", libraryItem.Author);
                    //If the libraryitem doesnt have any pages, set the value to null.
                    if (libraryItem.Pages != null)
                    {
                        myCommand.Parameters.AddWithValue("@Pages", libraryItem.Pages);
                    }
                    else
                    {
                        myCommand.Parameters.AddWithValue("@Pages", DBNull.Value);
                    }
                    //If the libraryitem doesnt have runtimeminutes, set the value to null.
                    if (libraryItem.RunTimeMinutes != null)
                    {
                        myCommand.Parameters.AddWithValue("@RunTimeMinutes", libraryItem.RunTimeMinutes);
                    }
                    else
                    {
                        myCommand.Parameters.AddWithValue("@RunTimeMinutes", DBNull.Value);
                    }
                    myCommand.Parameters.AddWithValue("@IsBorrowable", libraryItem.IsBorrowable);
                    myCommand.Parameters.AddWithValue("@Borrower", libraryItem.Borrower);
                    //If the libraryitem doesnt have a borrowdate, set the value to null.
                    if (libraryItem.BorrowDate != null)
                    {
                        myCommand.Parameters.AddWithValue("@BorrowDate", libraryItem.BorrowDate);
                    }
                    else
                    {
                        myCommand.Parameters.AddWithValue("@BorrowDate", DBNull.Value);
                    }
                    myCommand.Parameters.AddWithValue("@Type", libraryItem.Type);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("LibraryItem has been successfully updated.");
        }
        //POST METHOD
        [HttpPost]
        public JsonResult Post(LibraryItem libraryItem)
        {
            string query = @"
                INSERT INTO 
                    dbo.LibraryItem
                        (CategoryId, Title, Author, Pages, RunTimeMinutes, IsBorrowable, Borrower, BorrowDate, Type)
                VALUES 
                    (@CategoryId, @Title, @Author, @Pages, @RunTimeMinutes, @IsBorrowable, @Borrower, @BorrowDate, @Type)
            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@CategoryId", libraryItem.CategoryId);
                    myCommand.Parameters.AddWithValue("@Title", libraryItem.Title);
                    myCommand.Parameters.AddWithValue("@Author", libraryItem.Author);
                    //If the libraryitem doesnt have any pages, set the value to null.
                    if(libraryItem.Pages != null)
                    {
                        myCommand.Parameters.AddWithValue("@Pages", libraryItem.Pages);
                    }
                    else
                    {
                        myCommand.Parameters.AddWithValue("@Pages", DBNull.Value);
                    }
                    //If the libraryitem doesnt have runtimeminutes, set the value to null.
                    if (libraryItem.RunTimeMinutes != null)
                    {
                        myCommand.Parameters.AddWithValue("@RunTimeMinutes", libraryItem.RunTimeMinutes);
                    }
                    else
                    {
                        myCommand.Parameters.AddWithValue("@RunTimeMinutes", DBNull.Value);
                    }
                    myCommand.Parameters.AddWithValue("@IsBorrowable", libraryItem.IsBorrowable);
                    myCommand.Parameters.AddWithValue("@Borrower", libraryItem.Borrower);
                    //If the libraryitem doesnt have a borrowdate, set the value to null.
                    if (libraryItem.BorrowDate != null)
                    {
                        myCommand.Parameters.AddWithValue("@BorrowDate", libraryItem.BorrowDate);
                    }
                    else
                    {
                        myCommand.Parameters.AddWithValue("@BorrowDate", DBNull.Value);
                    }
                    myCommand.Parameters.AddWithValue("@Type", libraryItem.Type);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("LibraryItem has been successfully added.");
        }
        //DELETE METHOD
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                DELETE FROM dbo.LibraryItem
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
            return new JsonResult("LibraryItem has been successfully deleted.");
        }
    }
}
