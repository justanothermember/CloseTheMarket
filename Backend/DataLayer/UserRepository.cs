using System.Data;
using Microsoft.Data.SqlClient;
using Model;

namespace DataLayer
{
    public class UserRepository : UserInterfaceRepository
    {

        private readonly string connectionURL;

        public UserRepository(string connectionURL)
        {
            this.connectionURL = connectionURL;
        }

        public AccountUser Create(AccountUser user)
        {
            using(SqlConnection connection = new SqlConnection(connectionURL))
            {
                connection.Open();

                SqlCommand command = new SqlCommand("CreateUser", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@username", user.username);
                command.Parameters.AddWithValue("@password", user.password);
                command.Parameters.AddWithValue("@email", user.email);
                command.Parameters.AddWithValue("@firstname", user.first_name);
                command.Parameters.AddWithValue("@lastname", user.last_name);
                command.Parameters.AddWithValue("@age", user.age);
                command.Parameters.AddWithValue("@isBanned", user.isBanned);
                command.Parameters.AddWithValue("@isModerator", user.isModerator);
                command.Parameters.AddWithValue("@dateCreated", DateTime.Now);

                command.ExecuteNonQuery();
            }
            return user;
        }

        public int Delete(string username, string password)
        {
            var result = 0;
            using(SqlConnection connection = new SqlConnection(connectionURL))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("DeleteUser", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@username", username);
                command.Parameters.AddWithValue("@password", password);
                command.Parameters.Add(new SqlParameter()
                {
                    Direction = ParameterDirection.Output, 
                    ParameterName = "@retVal", 
                    SqlDbType = SqlDbType.Int
                });
                command.ExecuteNonQuery();
                
                result = (int) command.Parameters["@retVal"].Value;
            }
            return result;
        }

        public AccountUser Get(int id)
        {
            string query = @"select * from [AccountUser] where id = @id;";
            using(SqlConnection connection = new SqlConnection(connectionURL))
            {
                connection.Open();

                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@id", id);
                SqlDataReader reader = command.ExecuteReader();
                if (reader.Read())
                {
                    AccountUser user = new AccountUser()
                    {
                        id = reader.GetInt32(0),
                        username = reader.GetString(1),
                        email = reader.GetString(3),
                        first_name = reader.GetString(5),
                        last_name = reader.GetString(6),
                        age = reader.GetInt32(7),
                        isBanned = reader.GetInt32(8),
                        isModerator = reader.GetInt32(9),
                        date_created = reader.GetDateTime(10)

                    };
                    return user;
                }
                else
                {
                    return null;
                }
            }
        
        }

        public AccountUser Login(string username, string password)
        {
            throw new NotImplementedException();
        }
    }
}