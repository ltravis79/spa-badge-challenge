# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Person.destroy_all

Person.create(name: "Lindsey Ullman")
Person.create(name: "Monique Williamson")
Person.create(name: "Timur Catakli")
Person.create(name: "Kevin Huang")
Person.create(name: "Gary Wong")
Person.create(name: "Dave Spivey")
Person.create(name: "Roche Janken")
Person.create(name: "Jordan Fox")
Person.create(name: "Pete Lowe")
Person.create(name: "Albert Hahn")
Person.create(name: "David Rothschild")
Person.create(name: "Amaar Fazlani")
Person.create(name: "Reuben Brandt")

Person.all.each do |person|
  Badge.create(person_id: person.id, title: "Most likely to have #{Faker::Superhero.power}")
  Badge.create(person_id: person.id, title: "#{Faker::StarWars.quote}")
  Badge.create(person_id: person.id, title: "Most likely to drink a #{Faker::Beer.name}")
end
