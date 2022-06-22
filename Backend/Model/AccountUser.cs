namespace Model;
public class AccountUser
{

    public int id { get; set; }

    public string username { get; set; }

    public string first_name { get; set; }

    public string last_name { get; set; }

    public int age { get; set; }

    public bool isBanned { get; set; }

    public bool isModerator { get; set; }

}