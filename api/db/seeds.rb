# Seeds

# Game 1
g1 = Game.create(name: "Math", description: "Simple math problems.")

l1 = Level.create(question: "sqrt(5! - (-1))", game: g1)
Answer.create(label: "22", level: l1)
Answer.create(label: "12", level: l1)
Answer.create(label: "5", level: l1)
Answer.create(label: "11", level: l1, is_correct: true)

l2 = Level.create(question: "7!/6!", game: g1)
Answer.create(label: "1", level: l2)
Answer.create(label: "7", level: l2, is_correct: true)
Answer.create(label: "42", level: l2)
Answer.create(label: "6", level: l2)

l3 = Level.create(question: "sqrt(5! + 4!)", game: g1)
Answer.create(label: "11", level: l3)
Answer.create(label: "14", level: l3)
Answer.create(label: "8", level: l3)
Answer.create(label: "12", level: l3, is_correct: true)

l4 = Level.create(question: "1 + 1 / 1 - 1", game: g1)
Answer.create(label: "11", level: l4)
Answer.create(label: "1", level: l4, is_correct: true)
Answer.create(label: "0", level: l4)
Answer.create(label: "2", level: l4)

l5 = Level.create(question: "1 + 2 + 3 + 4", game: g1)
Answer.create(label: "9", level: l5)
Answer.create(label: "10", level: l5, is_correct: true)
Answer.create(label: "11", level: l5)
Answer.create(label: "8", level: l5)

l6 = Level.create(question: "sqrt(4! + (3! * 2))", game: g1)
Answer.create(label: "5", level: l6)
Answer.create(label: "17", level: l6)
Answer.create(label: "6", level: l6, is_correct: true)
Answer.create(label: "24", level: l6)

l7 = Level.create(question: "3 * 4^2", game: g1)
Answer.create(label: "18", level: l7)
Answer.create(label: "54", level: l7)
Answer.create(label: "48", level: l7, is_correct: true)
Answer.create(label: "12", level: l7)

l8 = Level.create(question: "(22 + 2) / 3!", game: g1)
Answer.create(label: "12", level: l8)
Answer.create(label: "9", level: l8)
Answer.create(label: "4", level: l8, is_correct: true)
Answer.create(label: "6", level: l8)

l9 = Level.create(question: "8^8 / 8^7", game: g1)
Answer.create(label: "48", level: l9)
Answer.create(label: "16,777,216", level: l9)
Answer.create(label: "8", level: l9, is_correct: true)
Answer.create(label: "160,000", level: l9)

l10 = Level.create(question: "(7! / 10) - 500", game: g1)
Answer.create(label: "200", level: l10)
Answer.create(label: "75", level: l10)
Answer.create(label: "4", level: l10, is_correct: true)
Answer.create(label: "1", level: l10)

# Game 2
g2 = Game.create(name: "U.S. Presidents", description: "Order the U.S. Presidents!")

l1 = Level.create(question: "George Washington", game: g2)
Answer.create(label: "2", level: l1)
Answer.create(label: "10", level: l1)
Answer.create(label: "4", level: l1)
Answer.create(label: "1", level: l1, is_correct: true)

l2 = Level.create(question: "John Adams", game: g2)
Answer.create(label: "9", level: l2)
Answer.create(label: "2", level: l2, is_correct: true)
Answer.create(label: "3", level: l2)
Answer.create(label: "22", level: l2)

l3 = Level.create(question: "Thomas Jefferson", game: g2)
Answer.create(label: "10", level: l3)
Answer.create(label: "8", level: l3)
Answer.create(label: "1", level: l3)
Answer.create(label: "3", level: l3, is_correct: true)

l4 = Level.create(question: "James Madison", game: g2)
Answer.create(label: "39", level: l4)
Answer.create(label: "4", level: l4, is_correct: true)
Answer.create(label: "19", level: l4)
Answer.create(label: "9", level: l4)

l5 = Level.create(question: "James Monroe", game: g2)
Answer.create(label: "4", level: l5)
Answer.create(label: "5", level: l5, is_correct: true)
Answer.create(label: "20", level: l5)
Answer.create(label: "11", level: l5)

l6 = Level.create(question: "John Quincy Adams", game: g2)
Answer.create(label: "16", level: l6)
Answer.create(label: "2", level: l6)
Answer.create(label: "6", level: l6, is_correct: true)
Answer.create(label: "18", level: l6)

l7 = Level.create(question: "Andrew Jackson", game: g2)
Answer.create(label: "14", level: l7)
Answer.create(label: "8", level: l7)
Answer.create(label: "7", level: l7, is_correct: true)
Answer.create(label: "17", level: l7)

l8 = Level.create(question: "Martin Van Buren", game: g2)
Answer.create(label: "22", level: l8)
Answer.create(label: "10", level: l8)
Answer.create(label: "8", level: l8, is_correct: true)
Answer.create(label: "4", level: l8)

l9 = Level.create(question: "William Henry Harrison", game: g2)
Answer.create(label: "23", level: l9)
Answer.create(label: "13", level: l9)
Answer.create(label: "9", level: l9, is_correct: true)
Answer.create(label: "10", level: l9)

l10 = Level.create(question: "John Tyler", game: g2)
Answer.create(label: "6", level: l10)
Answer.create(label: "36", level: l10)
Answer.create(label: "10", level: l10, is_correct: true)
Answer.create(label: "15", level: l10)


puts "------------------------------"
puts "#{Game.count} game(s) created"
puts "#{Level.count} levels created"
puts "#{Answer.count} answers created"
puts "------------------------------"
