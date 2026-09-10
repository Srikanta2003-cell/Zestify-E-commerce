```java
package com.zestify.repository;

import com.zestify.model.Product;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository
        extends JpaRepository<Product, Long> {

}
```
