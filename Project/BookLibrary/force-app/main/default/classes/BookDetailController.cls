public with sharing class BookDetailController {
    public BookDetailController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Book__c> getBooks(String strId){
        String key = strId;
        List<Book__c> books = [
            SELECT Id, Google_Book_Id__c, Goodreads_Book_Id__c, 
            Name, Authors__c, ISBN_10__c, ISBN_13__c, Image_Link__c, 
            Average_Rating__c, Publisher__c, Page_Count__c, 
            Year_Published__c, Published_Date__c
            FROM Book__c WHERE Id = :key
        ];
        return books;
    }
}
