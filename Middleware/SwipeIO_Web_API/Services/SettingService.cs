using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwipeIO_Web_API.Services
{
    public interface ISettingService
    {
        IEnumerable<Card> GetCards();
        IEnumerable<Gate> GetGates();
        IEnumerable<Leave> GetLeaves();

    }
    public class SettingService : ISettingService
    {
        MyDbContext setting = new MyDbContext();
        public IEnumerable<Card> GetCards()
        {
            Card[] _cards = setting.Card.FromSql("call get_cards();").ToArray();
            return _cards;
        }

        public IEnumerable<Gate> GetGates()
        {
            Gate[] _gates = setting.Gate.FromSql("call get_gates();").ToArray();
            return _gates;
        }

        public IEnumerable<Leave> GetLeaves()
        {
            Leave[] _leaves = setting.Leave.FromSql("call get_leave_descriptions();").ToArray();
            return _leaves;
        }
    }
}
