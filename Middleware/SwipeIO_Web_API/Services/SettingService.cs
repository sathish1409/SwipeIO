using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SwipeIO_Web_API.Services {
    public interface ISettingService {
        IEnumerable<Card> GetCards ();
        IEnumerable<Gate> GetGates ();
        IEnumerable<Leave> GetLeaves ();

        int AddCard (Card card);
        int AddGate (Gate gate);
        int AddLeave (Leave leave);
        int DeleteGates (int id);
        int DeleteCards (int id);
        int DeleteLeaves (int id);

        Card getCard (int card_id);

    }
    public class SettingService : ISettingService {
        MyDbContext setting = new MyDbContext ();
        public IEnumerable<Card> GetCards () {
            try {
                Card[] _cards = setting.Card.FromSql ("call get_cards();").ToArray ();
                return _cards;
            } catch (Exception e) {
                Console.WriteLine (e);
                return null;
            }
        }

        public IEnumerable<Gate> GetGates () {
            try {
                Gate[] _gates = setting.Gate.FromSql ("call get_gates();").ToArray ();
                return _gates;
            } catch (Exception e) {
                Console.WriteLine (e);
                return null;
            }

        }

        public IEnumerable<Leave> GetLeaves () {
            try {
                Leave[] _leaves = setting.Leave.FromSql ("call get_leave_descriptions();").ToArray ();
                return _leaves;
            } catch (Exception e) {
                Console.WriteLine (e);
                return null;
            }

        }

        public int AddCard (Card card) {
            try {
                int isDone = setting.Database.ExecuteSqlCommand ("call insert_card({0});", card.card_number);
                return isDone;
            } catch (Exception e) {
                Console.WriteLine (e);
                return 0;
            }

        }
        public int AddGate (Gate gate) {
            try {
                int isDone = setting.Database.ExecuteSqlCommand ("call insert_gate({0});", gate.gate_name);
                return isDone;
            } catch (Exception e) {
                Console.WriteLine (e);
                return 0;
            }

        }
        public int AddLeave (Leave leave) {
            try {
                int isDone = setting.Database.ExecuteSqlCommand ("call insert_leave_description({0});", leave.leave_name);
                return isDone;
            } catch (Exception e) {
                Console.WriteLine (e);
                return 0;
            }

        }
        public int DeleteGates (int id) {
            try {
                int isDelete = setting.Database.ExecuteSqlCommand ("call delete_gate({0});", id);
                return isDelete;
            } catch (Exception e) {
                Console.WriteLine (e);
                return 0;
            }

        }
        public int DeleteCards (int id) {
            try {
                int isDelete = setting.Database.ExecuteSqlCommand ("call delete_cards({0});", id);
                return isDelete;
            } catch (Exception e) {
                Console.WriteLine (e);
                return 0;
            }

        }

        public int DeleteLeaves (int id) {
            try {
                int isDelete = setting.Database.ExecuteSqlCommand ("call delete_leave_description({0});", id);
                return isDelete;
            } catch (Exception e) {
                Console.WriteLine (e);
                return 0;
            }

        }

        public Card getCard (int card_id) {
            try {
                Card card = setting.Card.FromSql ("call get_card({0});", card_id).First ();
                return card;
            } catch (Exception e) {
                Console.WriteLine (e);
                return null;
            }

        }
    }
}