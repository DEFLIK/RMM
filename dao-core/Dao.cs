using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Npgsql;
using web_core.Interfaces;

namespace dao_core
{
    public class Dao
    {
        private static void Main(string[] args)
        {
        }

        public static bool TestConnection()
        {
            using var connection = GetConnection();
            connection.Open();
            return connection.State == ConnectionState.Open;
        }

        public TId WriteRecord<TValue, TId>(string schema, string table, TValue value)
        {
            throw new NotImplementedException();
        }

        public async Task<List<string>> GetRecordAsync(string table, string id)
        {
            var row = new List<string>();
            await using var conn = GetConnection();
            conn.Open();

            await using var cmd = new NpgsqlCommand($"SELECT * FROM {table} where id = {id}", conn);
            await using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
                for (var i = 0; i < reader.FieldCount; i++)
                    row.Add(reader[i].ToString());
            return row;
        }

        private static NpgsqlConnection GetConnection() =>
            new NpgsqlConnection(@"Server=localhost;Port=5432;User Id=postgres;Password=none;Database=RMM;");
    }
}
