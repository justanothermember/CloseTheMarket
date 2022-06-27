namespace Model;
public class AccountUser
{

    public int id { get; set; }

    public string username { get; set; }

    public string password { get; set; }

    public string first_name { get; set; }

    public string last_name { get; set; }

    public string email { get; set; }

    public int age { get; set; }

    public int isBanned { get; set; }

    public int isModerator { get; set; }

    public DateTime date_created { get; set; }

}