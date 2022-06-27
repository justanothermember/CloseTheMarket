using Model;

namespace DataLayer
{
    public interface UserInterfaceRepository
    {

        public AccountUser Login(string username, string password);

        public AccountUser Create(AccountUser user);

        public AccountUser Get(int id);

        public int Delete(string username, string password);
    }

}