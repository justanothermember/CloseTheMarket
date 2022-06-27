using DataLayer;
using Model;

namespace BusinessLayer
{
    public class Users : IUsers
    {
        
        private UserInterfaceRepository repository;
        
        public Users(UserInterfaceRepository repository)
        {
            this.repository = repository;
        }
        public AccountUser Create(AccountUser user)
        {
            return repository.Create(user);
        }

        public int Delete(string username, string password)
        {
            return repository.Delete(username, password);
        }

        public AccountUser Get(int id)
        {
            return repository.Get(id);
        }

        public AccountUser Login(string username, string password)
        {
            return repository.Login(username, password);
        }
    }
}