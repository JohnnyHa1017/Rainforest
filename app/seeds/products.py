from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    DDR = Product(
        user_id=1,
        name='CORSAIR VENGEANCE DDR5 RAM 64GB 5200MHz',
        price=169.99,
        category='Computer',
        quantity_available=136,
        image='https://aaproj-yelp-clone.s3.us-west-1.amazonaws.com/rainforest_128_ddr.jpg',
        body='Welcome to the Cutting-Edge of Performance: Push the limits of your system like never before with DDR5 memory, unlocking even faster frequencies, greater capacities, and better performance than previous generations.'
        )
    GRAPHICSCARD = Product(
        user_id=1,
        name='NVIDIA GeForce RTX 4090 Founders Edition Graphic Card',
        price=2173.95,
        category='Computer',
        quantity_available=112,
        image='https://aaproj-yelp-clone.s3.us-west-1.amazonaws.com/rainforest_4090.jpg',
        body='The NVIDIA GeForce RTX 4090 is the ultimate GeForce GPU. It brings an enormous leap in performance, efficiency, and AI-powered graphics.'
        )
    AQUAPHOR = Product(
        user_id=2,
        name='Aquaphor Healing Ointment, Advanced Therapy',
        price=15.99,
        category='Health',
        quantity_available=999,
        image='https://aaproj-yelp-clone.s3.us-west-1.amazonaws.com/rainforest_aquaphor.jpg',
        body='FOR DRY, COMPROMISED SKIN: This Aquaphor Healing Ointment is designed specifically for dry, compromised skin and clinically proven to restore smooth, healthy skin.'
        )
    ARIASNOW = Product(
        user_id=2,
        name='Moondrop Aria Snow Edition Wired Earbud',
        price=79.99,
        category='Electronics',
        quantity_available=122,
        image='https://aaproj-yelp-clone.s3.us-west-1.amazonaws.com/rainforest_aria_snow.jpg',
        body='Aria Snow Edition Clear Refined Sound Pure as Snow :As the name suggests, the sound of the Aria Snow is clear, transparent, and rich in detail.'
        )
    ARTOFWAR = Product(
        user_id=3,
        name='The Art of War (Deluxe Hardbound Edition)',
        price=15.95,
        category='Books',
        quantity_available=1121,
        image='https://aaproj-yelp-clone.s3.us-west-1.amazonaws.com/rainforest_art_of_war.jpg',
        body='The Art of War is a renowned ancient Chinese military treatise written by Sun Tzu, a military strategist and philosopher.'
        )
    BLUEYETI = Product(
        user_id=3,
        name='Logitech for Creators Blue Yeti X USB Microphone',
        price=127.99,
        category='Electronics',
        quantity_available=29,
        image='https://aaproj-yelp-clone.s3.us-west-1.amazonaws.com/rainforest_blue_yeti.jpg',
        body='Craft The Perfect Broadcast Vocal Sound And Entertain Your Audience With Enhanced Effects, Advanced Modulation And Hd Audio Samples.'
        )
    DIGESTADV = Product(
        user_id=4,
        name='Digestive Advantage Prebiotic Fiber Gummies',
        price=11.99,
        category='Health',
        quantity_available=2036,
        image='https://aaproj-yelp-clone.s3.us-west-1.amazonaws.com/rainforest_digestive_advantage.jpg',
        body='FIBER GUMMIES: Our great tasting strawberry flavored gummies are carefully formulated with polydextrose.'
        )
    DIORSADDLE = Product(
        user_id=4,
        name='Christian Dior Saddlebag (Unisex)',
        price=3900.00,
        category='Clothing',
        quantity_available=111,
        image='https://aaproj-yelp-clone.s3.us-west-1.amazonaws.com/rainforest_dior_saddlebag.jpg',
        body='Equipped with our Signature Buckle Shoulder Strap, the beautifully hand crafted Saddlebag by Dior can be worn crossbody or over the shoulder.'
        )
    HYDROFLASK = Product(
        user_id=4,
        name='Hydroflak 32oz Waterbottle',
        price=15.99,
        category='Utility',
        quantity_available=89,
        image='https://aaproj-yelp-clone.s3.us-west-1.amazonaws.com/rainforest_hydroflask.jpg',
        body='DRINKS STAY COOL FOR 24HRS AND KEEPS DRINKS WARM FOR UP TO 12 HOURS: Carry up to 32oz of liquid with our large Hydro! (Comes with sip lid)'
        )
    MACBOOK = Product(
        user_id=5,
        name='Macbook 2023 Pro 14-inch M3 Max Chip',
        price=2169.99,
        category='Computer',
        quantity_available=1360,
        image='https://aaproj-yelp-clone.s3.us-west-1.amazonaws.com/rainforest_macbook_pro.jpg',
        body='Released 2023, the Macbook Pro comes equipped with our fastest processor ever, the M3 Max.'
        )
    RAZERV2 = Product(
        user_id=5,
        name='Razer Viper V2 Ultimate Gaming Mouse',
        price=123.95,
        category='Computer',
        quantity_available=112,
        image='https://aaproj-yelp-clone.s3.us-west-1.amazonaws.com/rainforest_razer_v2.jpg',
        body='Bring home the power and speed with the Razer Viper V2 Ultimate. Now equipped with Hyperconnect for a lightspeed and seemless connection.'
        )
    RING = Product(
        user_id=6,
        name='Ring V3 Doorbell Camera',
        price=215.99,
        category='Electronics',
        quantity_available=999,
        image='https://aaproj-yelp-clone.s3.us-west-1.amazonaws.com/rainforest_ring_doorbell.jpg',
        body='UPDATED: Capture from full head to toe what happens at your doorstep. Ward off intruders with the built in mic via the Ring App.'
        )
    SMARTYPANTS = Product(
        user_id=6,
        name='SmartyPants Multivitamins for Men',
        price=16.99,
        category='Health',
        quantity_available=436,
        image='https://aaproj-yelp-clone.s3.us-west-1.amazonaws.com/rainforest_smarty_pants.jpg',
        body='Multivitamin blend made for men, enjoy 6 gummies a day for all your supplemental needs.'
        )
    SPECTREMON = Product(
        user_id=7,
        name='Spectre 24-inch Gaming Monitor',
        price=99.95,
        category='Electronics',
        quantity_available=112,
        image='https://aaproj-yelp-clone.s3.us-west-1.amazonaws.com/rainforest_spectre_monitor.jpg',
        body='Experience high graphics at a low price with the Spectre Gaming Monitor. Doubles as a great additional monitor for other activities such as coding.'
        )
    WEIGHTS = Product(
        user_id=7,
        name='Dumbbell Weight Set',
        price=165.99,
        category='Health',
        quantity_available=109,
        image='https://aaproj-yelp-clone.s3.us-west-1.amazonaws.com/rainforest_weight_set.jpg',
        body='FOR USE AT HOME: Bring the gym home with our multi weight set, featuring 5 different weights in sets of 2 dumbbells.'
        )
    WOOTING = Product(
        user_id=8,
        name='Wooting 80HE - Founders Edition',
        price=315.99,
        category='Computer',
        quantity_available=2049,
        image='https://aaproj-yelp-clone.s3.us-west-1.amazonaws.com/rainforest_wooting_80he.png',
        body='Unleash the beast with the superior gaming tactile switches by Wooting. Stunning aluminum alloy body and PVC Switches to satisfy all enthusiests.'
        )
    CAPTAINUP = Product(
        user_id=8,
        name='Captain Underpants Complete Box Set',
        price=32.10,
        category='Books',
        quantity_available=333,
        image='https://aaproj-yelp-clone.s3.us-west-1.amazonaws.com/rainforest_captain.jpg',
        body='Laugh out loud with Captain Underpants, the #1 New York Times bestselling series from Dav Pilkey, the author and illustrator of Dog Man!'
    )
    DRAGONTEE = Product(
        user_id=9,
        name='Dandelion Dragon Tee (Unisex)',
        price=19.99,
        category='Clothing',
        quantity_available=555,
        image='https://aaproj-yelp-clone.s3.us-west-1.amazonaws.com/rainforest_dragon.jpeg',
        body='Unleash the mythical charm of dragons with our best collection dragon shirt kids, dragon shirts for adults and dragon t shirts for women.'
    )
    QUIP = Product(
        user_id=9,
        name='Quip Electric Toothbrush and Waterpik',
        price=199.99,
        category='Health',
        quantity_available=555,
        image='https://aaproj-yelp-clone.s3.us-west-1.amazonaws.com/rainforest_quip.png',
        body='With auto-refill packages and lifetime warranty backing our products, youre guaranteed a pearly white smile!.'
    )
    FLORALDRESS = Product(
        user_id=10,
        name='Floral Print Chiffon A-Line Mini Dress for Women',
        price=44.99,
        category='Clothing',
        quantity_available=888,
        image='https://aaproj-yelp-clone.s3.us-west-1.amazonaws.com/rainforest_womens_dress.jpg',
        body='[Unique Design]: Embrace casual chic in our black floral long sleeve dress, featuring for chiffon fabric, elastic waist to fit, floral print design bring the sense of mystery and surprise.'
    )

    db.session.add_all([DDR, GRAPHICSCARD, AQUAPHOR, ARIASNOW, ARTOFWAR, BLUEYETI, DIGESTADV, DIORSADDLE, HYDROFLASK, MACBOOK, RAZERV2, RING, SMARTYPANTS, SPECTREMON, WEIGHTS, WOOTING, CAPTAINUP, DRAGONTEE, QUIP, FLORALDRESS])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
