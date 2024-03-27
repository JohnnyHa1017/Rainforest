from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    DDR_Review = Review(
        user_id=10,
        product_id=1,
        rating=5,
        verified_purchase=True,
        image=None,
        body="Wow the DDR5 by Corsair has been phenomenal! I have been using these in my build for the last 5 months and I'm loving the render speed!"
    )
    GC_Review = Review(
        user_id=3,
        product_id=2,
        rating=4,
        verified_purchase=False,
        image=None,
        body="The NVIDIA GeForce RTX 4090 is a beast of a graphic card! I've been playing all the latest games at ultra settings without any lag. Highly recommend it!"
    )
    AQ_Review = Review(
        user_id=4,
        product_id=3,
        rating=3,
        verified_purchase=True,
        image=None,
        body="I've been using the Aquaphor Healing Ointment for a while now, and it's been great for my dry skin. Would have given it a higherrating= it wasn't for the greasy feeling."
    )
    AS_Review = Review(
        user_id=1,
        product_id=4,
        rating=5,
        verified_purchase=False,
        image=None,
        body="The Moondrop Aria Snow Edition Earbuds are simply amazing! The sound quality is crystal clear, and they fit perfectly in my ears. Definitely worth the investment!"
    )
    AOW_Review = Review(
        user_id=6,
        product_id=5,
        rating=4,
        verified_purchase=True,
        image=None,
        body="The Art of War is a timeless classic! Sun Tzu's teachings are still relevant today. This deluxe hardbound edition is beautifully presented."
    )
    BY_Review = Review(
        user_id=2,
        product_id=6,
        rating=5,
        verified_purchase=False,
        image=None,
        body="The Logitech for Creators Blue Yeti X USB Microphone has been a game-changer for my recordings! The audio quality is superb, and the advanced features are a plus."
    )
    DA_Review = Review(
        user_id=9,
        product_id=7,
        rating=3,
        verified_purchase=True,
        image=None,
        body="The Digestive Advantage Prebiotic Fiber Gummies taste good, but I haven't noticed any significant improvement in my digestion after using them for a month."
    )
    CD_Review = Review(
        user_id=3,
        product_id=8,
        rating=4,
        verified_purchase=False,
        image=None,
        body="The Christian Dior Saddlebag is absolutely stunning! The craftsmanship is top-notch, and it's so versatile to wear. Definitely a statement piece!"
    )
    HF_Review = Review(
        user_id=9,
        product_id=9,
        rating=2,
        verified_purchase=True,
        image=None,
        body="The Hydroflask Waterbottle is leaking after just a few uses. I'm disappointed with the quality, especially considering the price."
    )
    MB_Review = Review(
        user_id=10,
        product_id=10,
        rating=5,
        verified_purchase=True,
        image=None,
        body="The Macbook 2023 Pro 14-inch with M3 Max Chip is a beast! It handles all my tasks with ease, and the display is stunning. Couldn't be happier with my purchase!"
    )
    RV_Review = Review(
        user_id=1,
        product_id=11,
        rating=4,
        verified_purchase=False,
        image=None,
        body="The Razer Viper V2 Ultimate Gaming Mouse is comfortable to use for long gaming sessions, and the responsiveness is great. The RGB lighting is a nice touch!"
    )
    RDB_Review = Review(
        user_id=2,
        product_id=12,
        rating=5,
        verified_purchase=True,
        image=None,
        body="The Ring V3 Doorbell Camera provides peace of mind knowing I can monitor my doorstep from anywhere. The video quality is excellent, and the setup was easy."
    )
    SP_Review = Review(
        user_id=3,
        product_id=13,
        rating=3,
        verified_purchase=True,
        image=None,
        body="The SmartyPants Multivitamins for Men taste good, but I'm not sure if they're making a difference in my overall health. I'll continue to take them and see."
    )
    SM_Review = Review(
        user_id=4,
        product_id=14,
        rating=3,
        verified_purchase=False,
        image=None,
        body="The Spectre 24-inch Gaming Monitor has excellent color reproduction, but I noticed some backlight bleeding in dark scenes. Overall, a decent monitor for the price."
    )
    WS_Review = Review(
        user_id=5,
        product_id=15,
        rating=2,
        verified_purchase=True,
        image=None,
        body="The Dumbbell Weight Set arrived damaged, and the weights are not properly balanced. Disappointed with the quality control."
    )
    WT_Review = Review(
        user_id=6,
        product_id=16,
        rating=5,
        verified_purchase=False,
        image=None,
        body="The Wooting 80HE - Founders Edition keyboard is a dream to type on! The tactile switches provide a satisfying typing experience, and the build quality is superb."
    )
    CUP_Review = Review(
        user_id=7,
        product_id=17,
        rating=4,
        verified_purchase=True,
        image=None,
        body="The Captain Underpants Complete Box Set brings back nostalgic memories! It's a fun read for kids and adults alike. Highly recommend for a good laugh!"
    )
    DT_Review = Review(
        user_id=8,
        product_id=18,
        rating=3,
        verified_purchase=False,
        image=None,
        body="The Dandelion Dragon Tee is cute, but the fabric feels a bit rough against the skin. Would have preferred a softer material."
    )
    QT_Review = Review(
        user_id=9,
        product_id=19,
        rating=5,
        verified_purchase=True,
        image=None,
        body="The Quip Electric Toothbrush and Waterpik combo is a game-changer for my dental hygiene routine! My teeth feel cleaner, and the waterpik is gentle yet effective."
    )
    WD_Review = Review(
        user_id=10,
        product_id=20,
        rating=4,
        verified_purchase=True,
        image=None,
        body="The Floral Print Chiffon A-Line Mini Dress for Women is stunning! I wore it to a party, and I received so many compliments. The chiffon fabric is lightweight and flowy, perfect for summer. The elastic waist provides a flattering fit, and the floral print adds a touch of elegance to the dress. Overall, I'm very happy with my purchase!"
    )
    WD_Review2 = Review(
        user_id=1,
        product_id=20,
        rating=4,
        verified_purchase=True,
        image=None,
        body="The Floral Print Chiffon A-Line Mini Dress for Women is stunning! I wore it to a party, and I received so many compliments. The chiffon fabric is lightweight and flowy, perfect for summer. The elastic waist provides a flattering fit, and the floral print adds a touch of elegance to the dress. Overall, I'm very happy with my purchase!"
    )
    QT_Review2 = Review(
        user_id=2,
        product_id=19,
        rating=5,
        verified_purchase=True,
        image=None,
        body="The Quip Electric Toothbrush and Waterpik combo is a game-changer for my dental hygiene routine! My teeth feel cleaner, and the waterpik is gentle yet effective."
    )
    DT_Review2 = Review(
        user_id=3,
        product_id=18,
        rating=3,
        verified_purchase=False,
        image=None,
        body="The Dandelion Dragon Tee is cute, but the fabric feels a bit rough against the skin. Would have preferred a softer material."
    )
    CUP_Review2 = Review(
        user_id=4,
        product_id=17,
        rating=4,
        verified_purchase=True,
        image=None,
        body="The Captain Underpants Complete Box Set brings back nostalgic memories! It's a fun read for kids and adults alike. Highly recommend for a good laugh!"
    )
    WT_Review2 = Review(
        user_id=5,
        product_id=16,
        rating=5,
        verified_purchase=False,
        image=None,
        body="The Wooting 80HE - Founders Edition keyboard is a dream to type on! The tactile switches provide a satisfying typing experience, and the build quality is superb."
    )
    WS_Review2 = Review(
        user_id=6,
        product_id=15,
        rating=2,
        verified_purchase=True,
        image=None,
        body="The Dumbbell Weight Set arrived damaged, and the weights are not properly balanced. Disappointed with the quality control."
    )
    SM_Review2 = Review(
        user_id=7,
        product_id=14,
        rating=3,
        verified_purchase=False,
        image=None,
        body="The Spectre 24-inch Gaming Monitor has excellent color reproduction, but I noticed some backlight bleeding in dark scenes. Overall, a decent monitor for the price."
    )
    SP_Review2 = Review(
        user_id=8,
        product_id=13,
        rating=3,
        verified_purchase=True,
        image=None,
        body="The SmartyPants Multivitamins for Men taste good, but I'm not sure if they're making a difference in my overall health. I'll continue to take them and see."
    )
    RDB_Review2 = Review(
        user_id=9,
        product_id=12,
        rating=5,
        verified_purchase=True,
        image=None,
        body="The Ring V3 Doorbell Camera provides peace of mind knowing I can monitor my doorstep from anywhere. The video quality is excellent, and the setup was easy."
    )
    RV_Review2 = Review(
        user_id=10,
        product_id=11,
        rating=4,
        verified_purchase=False,
        image=None,
        body="The Razer Viper V2 Ultimate Gaming Mouse is comfortable to use for long gaming sessions, and the responsiveness is great. The RGB lighting is a nice touch!"
    )
    MB_Review2 = Review(
        user_id=1,
        product_id=10,
        rating=5,
        verified_purchase=True,
        image=None,
        body="The Macbook 2023 Pro 14-inch with M3 Max Chip is a beast! It handles all my tasks with ease, and the display is stunning. Couldn't be happier with my purchase!"
    )
    HF_Review2 = Review(
        user_id=1,
        product_id=9,
        rating=2,
        verified_purchase=True,
        image=None,
        body="The Hydroflask Waterbottle is leaking after just a few uses. I'm disappointed with the quality, especially considering the price."
    )
    CD_Review2 = Review(
        user_id=3,
        product_id=8,
        rating=4,
        verified_purchase=False,
        image=None,
        body="The Christian Dior Saddlebag is absolutely stunning! The craftsmanship is top-notch, and it's so versatile to wear. Definitely a statement piece!"
    )
    DA_Review2 = Review(
        user_id=4,
        product_id=7,
        rating=3,
        verified_purchase=True,
        image=None,
        body="The Digestive Advantage Prebiotic Fiber Gummies taste good, but I haven't noticed any significant improvement in my digestion after using them for a month."
    )
    BY_Review2 = Review(
        user_id=2,
        product_id=6,
        rating=5,
        verified_purchase=False,
        image=None,
        body="The Logitech for Creators Blue Yeti X USB Microphone has been a game-changer for my recordings! The audio quality is superb, and the advanced features are a plus."
    )
    AOW_Review2 = Review(
        user_id=6,
        product_id=5,
        rating=4,
        verified_purchase=True,
        image=None,
        body="The Art of War is a timeless classic! Sun Tzu's teachings are still relevant today. This deluxe hardbound edition is beautifully presented."
    )
    AS_Review2 = Review(
        user_id=7,
        product_id=4,
        rating=5,
        verified_purchase=False,
        image=None,
        body="The Moondrop Aria Snow Edition Earbuds are simply amazing! The sound quality is crystal clear, and they fit perfectly in my ears. Definitely worth the investment!"
    )
    AQ_Review2 = Review(
        user_id=8,
        product_id=3,
        rating=3,
        verified_purchase=True,
        image=None,
        body="I've been using the Aquaphor Healing Ointment for a while now, and it's been great for my dry skin. Would have given it a higher rating if it wasn't for the greasy feeling."
    )
    GC_Review2 = Review(
        user_id=9,
        product_id=2,
        rating=4,
        verified_purchase=False,
        image=None,
        body="The NVIDIA GeForce RTX 4090 is a beast of a graphic card! I've been playing all the latest games at ultra settings without any lag. Highly recommend it!"
    )
    DDR_Review2 = Review(
        user_id=2,
        product_id=1,
        rating=5,
        verified_purchase=True,
        image=None,
        body="Wow the DDR5 by Corsair has been phenomenal! I have been using these in my build for the last 5 months and I'm loving the render speed!"
    )

    db.session.add_all([DDR_Review, GC_Review, AQ_Review, AS_Review, AOW_Review, BY_Review, DA_Review, CD_Review, HF_Review, MB_Review, RV_Review, RDB_Review, SP_Review, SM_Review, WS_Review, WT_Review, CUP_Review, DT_Review, QT_Review, WD_Review,
                        WD_Review2, QT_Review2, DT_Review2, CUP_Review2, WT_Review2, WS_Review2, SM_Review2, SP_Review2, RDB_Review2, RV_Review2, MB_Review2, HF_Review2, CD_Review2, DA_Review2, BY_Review2, AOW_Review2, AS_Review2, AQ_Review2, GC_Review2, DDR_Review2])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
