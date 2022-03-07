using System;
using System.Data;
using Npgsql;

namespace dao_core
{
    class DataManager
    {
        private static void Main(string[] args)
        {
        }

        private static bool TestConnection()
        {
            using var connection = GetConnection();
            connection.Open();
            return connection.State != ConnectionState.Open;
        }

        private static NpgsqlConnection GetConnection() =>
            new NpgsqlConnection(@"Server=localhost;Port=5432;User Id=postgres;Password=none;Database=RMM;");
    }
}
