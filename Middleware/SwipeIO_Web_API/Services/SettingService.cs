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

        int AddCard(Card card);
        int AddGate(Gate gate);
        int AddLeave(Leave leave);
        int DeleteGates(int id);
        int DeleteCards(int id);
        int DeleteLeaves(int id);


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

        public int AddCard(Card card)
        {
            int isDone = setting.Database.ExecuteSqlCommand("call insert_card({0});", card.card_number);
            return isDone;
        }
        public int AddGate(Gate gate)
        {
            int isDone = setting.Database.ExecuteSqlCommand("call insert_gate({0});", gate.gate_name);
            return isDone;
        }
        public int AddLeave(Leave leave)
        {
            int isDone = setting.Database.ExecuteSqlCommand("call insert_leave_description({0});", leave.leave_name);
            return isDone;
        }
        public int DeleteGates(int id)
        {
            int isDelete = setting.Database.ExecuteSqlCommand("call delete_gate({0});", id);
            return isDelete;
        }
        public int DeleteCards(int id)
        {
            int isDelete = setting.Database.ExecuteSqlCommand("call delete_cards({0});", id);
            return isDelete;
        }

        public int DeleteLeaves(int id)
        {
            int isDelete = setting.Database.ExecuteSqlCommand("call delete_leave_description({0});", id);
            return isDelete;
        }

    }
}
