using System;
using System.Security.Cryptography;

namespace NextTech.ChaChing123.Common.Utilities
{
    /// <summary>
    /// Summary description for PasswordGenerator.
    /// </summary>
    [Serializable]
    public static class PasswordGenerator
    {
        /// <summary>
        /// The minimum password length
        /// </summary>
        public const int MIN_PASSWORD_LENGTH = 3;

        // The C# random class is a little easier to use
        // than Java's Math.random, as you'll see in the 
        // random methods later on...
        /// <summary>
        /// The random
        /// </summary>
        private static Random random = new Random();

        /**
         * @return a random lowercase character from 'a' to 'z'
         */
        /// <summary>
        /// Randoms the lowercase.
        /// </summary>
        /// <returns>System.Char.</returns>
        private static char randomLowercase()
        {
            return (char)random.Next('a', 'z' + 1);
        }

        /**
         * @return a random uppercase character from 'A' to 'Z'
         */
        /// <summary>
        /// Randoms the uppercase.
        /// </summary>
        /// <returns>System.Char.</returns>
        private static char randomUppercase()
        {
            return (char)random.Next('A', 'Z' + 1);
        }

        /**
         * @return a random character in this list: !"#$%&'()*+,-./
         */
        /// <summary>
        /// Randoms the other.
        /// </summary>
        /// <returns>System.Char.</returns>
        private static char randomOther()
        {
            return (char)random.Next('!', '/' + 1);
        }


        /**
         * @return a random character from '0' to '9'
         */
        /// <summary>
        /// Randoms the number.
        /// </summary>
        /// <returns>System.Char.</returns>
        private static char randomNumber()
        {
            return (char)random.Next('0', '9' + 1);
        }

        // C# lets us use "delegates" to create a variable
        // that stores a reference to a function...
        /// <summary>
        /// Delegate RandomCharacter
        /// </summary>
        /// <returns>System.Char.</returns>
        delegate char RandomCharacter();

        /// <summary>
        /// Generates the password.
        /// </summary>
        /// <param name="length">The length.</param>
        /// <param name="isLowercaseIncluded">if set to <c>true</c> [is lowercase included].</param>
        /// <param name="isNumbersIncluded">if set to <c>true</c> [is numbers included].</param>
        /// <param name="isUppercaseIncluded">if set to <c>true</c> [is uppercase included].</param>
        /// <returns>System.String.</returns>
        public static string generatePassword(int length, bool isLowercaseIncluded, bool isNumbersIncluded, bool isUppercaseIncluded)
        {
            bool isOthersIncluded = false;

            string password = "";

            RandomCharacter[] r = new RandomCharacter[4];

            // keep track of how many array locations we're actually using
            int count = 0;

            if (isLowercaseIncluded)
            {
                // using our delegate, store a reference to the randomLowercase
                // function in our array
                r[count++] = new RandomCharacter(PasswordGenerator.randomLowercase);
            }
            if (isUppercaseIncluded)
            {
                r[count++] = new RandomCharacter(PasswordGenerator.randomUppercase);
            }
            if (isOthersIncluded)
            {
                r[count++] = new RandomCharacter(PasswordGenerator.randomOther);
            }
            if (isNumbersIncluded)
            {
                r[count++] = new RandomCharacter(PasswordGenerator.randomNumber);
            }

            for (int i = 0; i < length; i++)
            {
                password += r[(int)random.Next(0, count)]();
            }

            return password;
        } // end generatePassword method
    }

}
