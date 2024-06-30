namespace LibAPI.Database
{
    public interface IIdentifiable<TKey>
    {
        TKey GetId();
        string GetKeyName();
    }

}
